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
                references: { model: 'survivors', key: 'survivor_id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        }, 
        {
            sequelize
        }
        );

        return this;
    }

    static associate (models) {

        /* Relations (1, N) Inventory -> Resource */
        this.hasMany(models.Resource, {as: 'resources', foreignKey: 'inventory_id', onDelete: 'CASCADE'});
    }
    
}

export default Inventory;