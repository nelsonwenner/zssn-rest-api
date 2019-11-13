import Sequelize, { Model } from 'sequelize';

class Inventory extends Model {
    static init(sequelize) {
        super.init({

            inventory_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true 
            },
        
            points: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
        
            water: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            },
        
            food: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            },
        
            medication: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            },
        
            ammunition: {
                type: Sequelize.INTEGER(),
                defaultValue: 0
            },
        
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, 
        {
            sequelize
        }
        );

        return this;
    }
}

export default Inventory;