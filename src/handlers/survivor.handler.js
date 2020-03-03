import inventoryRepository from '../repositories/inventory.repository';
import survivorRepository from '../repositories/survivor.repository';
import locationRepository from '../repositories/location.repository';
import resourceRepository from '../repositories/resource.repository';
import itemRepository from '../repositories/item.repository';
import databaseConfig from '../database/config/config';
import notice from '../utils/error.types';
import Sequelize from 'sequelize';


class SurvivorHandler {

    async store(req, res) {
        
        try {
            
            const { location, inventory, ...survivor } = req.body;

            if (await itemRepository.notExistsItens(inventory)) {
                throw new Error(notice.ERROR_ITEM_DOES_NOT_EXIST);
            }

            const sequelize = new Sequelize(databaseConfig);
            const transaction = await sequelize.transaction();

            try {
                
                const { survivor_id } = await survivorRepository.create(survivor, {transaction: transaction});
                await locationRepository.create({survivor_id: survivor_id, ...location}, {transaction: transaction});
                const { inventory_id } = await inventoryRepository.create({survivor_id: survivor_id}, {transaction: transaction});

                await Promise.all(
                    inventory.map(async (data, index) => {

                        await resourceRepository.create({
                        inventory_id: inventory_id, 
                        item_id: data.item,
                        quantity: data.quantity}, 
                        {transaction: transaction});

                    })
                );

                await transaction.commit();

                return res.status(201).json({survivor_id: survivor_id});

            } catch (error) {

                if (transaction) await transaction.rollback();
            }

        } catch (error) {
            switch (error.message) {
                case notice.ERROR_ITEM_DOES_NOT_EXIST:
                    return res.status(404).json({error: notice.ERROR_ITEM_DOES_NOT_EXIST});
                default:
                    return res.json({error: error.message });
            }
        }
    }

    async index(req, res) {

        try {
            
            const survivors = await survivorRepository.listAll();
            return res.status(200).json(survivors);

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new SurvivorHandler();