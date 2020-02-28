import Sequelize, { Model } from 'sequelize';

class Location extends Model {
    static init(sequelize) {
        super.init({

            location_id: {
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
        
            latitude: {
                type: Sequelize.DOUBLE,
                allowNull: true,
                defaultValue: null,
            },
            
            longitude: {
                type: Sequelize.DOUBLE,
                allowNull: true,
                defaultValue: null
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