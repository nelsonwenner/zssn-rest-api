import databaseConfig from '../../config/config';
import inventoryModel from '../models/inventory';
import Sequelize from 'sequelize';


class InventoryRepository {

    async create(data) {
        return await inventoryModel.create(data);
    }

    verifyInventoryValues(resourcesToAnalyze, yoursResources) {
        const itemNotFound = [];
        const verify = [];
        
        resourcesToAnalyze.map((data, index) => {
            if (!!(yoursResources.find(resource => resource.item_id === data.item && 
                resource.quantity >= data.quantity))) {
                verify.push(1);
            } else {
                itemNotFound.push(0);
            }
        });
        if (verify.length === yoursResources.length &&
            itemNotFound.length === 0) {
            return false;
        }
        return true;        
    }

    calcPoints(reqResources, resources) {
        let points = 0;
        reqResources.map((data, index) => {
            resources.find(x => {
                if (x.item_id === data.item && x.item.name === 'Fiji Water') {
                    points += data.quantity * 14;
                }
                else if (x.item_id === data.item && x.item.name === 'Campbell Soup') {
                    points += data.quantity * 12;
                }
                else if (x.item_id === data.item && x.item.name === 'First Aid Pouch') {
                    points += data.quantity * 10;
                }
                else if (x.item_id === data.item && x.item.name === 'AK47') {
                    points += data.quantity * 8;
                }
            });
        });
        return points;
    }

    async swap(base, resources1, resources2) {
        const instances = [];

        base.map((data, index) => {
            resources1.find(itemSender => {
                if (itemSender.item_id == data.item) {
                    itemSender.quantity -= data.quantity;

                    resources2.find(itemTarget => {
                        if (itemTarget.item_id == data.item) {
                            itemTarget.quantity += data.quantity;

                            instances.push(itemSender);
                            instances.push(itemTarget);
                        }
                    });
                }
            });
        });
    
        const sequelize = new Sequelize(databaseConfig);
        const transaction = await sequelize.transaction();
       
        try {

            await Promise.all(
                instances.map(async (data, index) => {
                    
                    await data.save({ transaction: transaction });
                    
                })
            );

            return await transaction.commit();

        } catch (error) {
            
            if (transaction) await transaction.rollback();
        }
    }
}

export default new InventoryRepository(); 