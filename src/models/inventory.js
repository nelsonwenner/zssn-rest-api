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

            survivor_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'survivor', key: 'survivor_id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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

export default Location;