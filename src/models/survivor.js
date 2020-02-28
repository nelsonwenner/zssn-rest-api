import Sequelize, { Model } from 'sequelize';

class Survivor extends Model {
    
    static init(sequelize) {
        super.init({

            survivor_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true 
            },
        
            infected: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
        
            age: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        
            sex: {
                type: Sequelize.STRING,
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

    /* Relations (1, 1) Survivor -> Location */
    static associate (models) {
        this.hasOne(models.Location, {as: 'last_location', foreignKey: 'survivor_id', onDelete: 'CASCADE'});
    }

    /* Relations (1, 1) Survivor -> Inventory */
    static associate (models) {
        this.hasOne(models.Inventory, {as: 'inventories', foreignKey: 'survivor_id', onDelete: 'CASCADE'});
    }
}

export default Survivor;