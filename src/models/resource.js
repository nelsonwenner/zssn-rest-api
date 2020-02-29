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

            inventory_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'inventory', key: 'inventory_id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            item_id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false,
                references: { model: 'item', key: 'item_id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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

    static associate (models) {

        /* Relations (1, 1) Resource -> Item */
        this.belongsTo(models.Item, {as: 'item', foreignKey: 'item_id', onDelete: 'CASCADE'});
    }
}

export default Resource;