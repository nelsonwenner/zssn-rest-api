import inventoryRepository from '../repositories/inventory.repository';
import survivorRepository from '../repositories/survivor.repository';
import locationRepository from '../repositories/location.repository';
import resourceRepository from '../repositories/resource.repository';
import itemRepository from '../repositories/item.repository';
import databaseConfig from '../../config/config';
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

    async report(req, res) {

        try {

            const notInfecteds = await survivorRepository.infectedOrNotInfected(false);
            const isInfecteds = await survivorRepository.infectedOrNotInfected(true);
            const survivorAll = await survivorRepository.listAll();
            const amountLost = await resourceRepository.sum(true);
            const sumItens = await resourceRepository.sum(false);
       
            const payload = [
                {
                    description: "Percentage of infected survivors", 
                    percentage: {
                        values: ((100 / survivorAll.length ) * isInfecteds)
                    }
                },
                {
                    description: "Percentage of not infected survivors",
                    percentage: {
                        values: ((100 / survivorAll.length ) * notInfecteds)
                    }
                },
                {
                    description: "Average amount of each resource type per survivor",
                    FijiWater: {
                        average: {
                            values: (sumItens['Fiji Water'] / notInfecteds)
                        }
                    },
                    CampbellSoup: {
                        average: {
                            values: (sumItens['Campbell Soup'] / notInfecteds)
                        }
                    },
                    FirstAidPouch: {
                        average: {
                            values: (sumItens['First Aid Pouch'] / notInfecteds)
                        }
                    },
                    AK47: {
                        average: {
                            values: (sumItens['AK47'] / notInfecteds)
                        }
                    }
                },
                {
                    description: "Points lost because of infected survivor.",
                    points: {
                        values: ((amountLost['Fiji Water'] * 14) + 
                                (amountLost['Campbell Soup'] * 12) + 
                                (amountLost['First Aid Pouch'] * 10) + 
                                (amountLost['AK47'] * 8))
                    }
                }
            ]

            return res.status(200).json(payload);

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new SurvivorHandler();