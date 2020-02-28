import Sequelize, { Model } from 'sequelize';

class Resource extends Model {
    static init(sequelize) {
        super.init({

            resource_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true 
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
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

export default Resource;