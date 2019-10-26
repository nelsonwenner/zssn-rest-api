const { Sequelize, Model } = require('sequelize');

class Survivor extends Model {
    
    static init(sequelize) {
        super.init({

            survivor_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true 
            },
            
            inventory_id: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'Inventory',
                    key:  'inventory_id',
                    as: 'inventory',
                }
            },
        
            location_id: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'Location',
                    key: 'location_id',
                    as: 'last_location',
                }
            },
        
            infected: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
        
            flags_infected: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            
            name: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
        
            age: {
                type: Sequelize.INTEGER(2),
                allowNull: false
            },
        
            sex: {
                type: Sequelize.STRING(9),
                allowNull: false
            },
        
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        }, {
            sequelize
        });
    }

    /* Relations 1:1 */
    static associate (models) {
        this.hasOne(models.Inventory, {as: 'inventory', foreignKey: 'inventory_id', onDelete: 'cascade'});
        this.hasOne(models.Location, {as: 'last_location', foreignKey: 'location_id', onDelete: 'cascade'});
    }
}

module.exports = Survivor;