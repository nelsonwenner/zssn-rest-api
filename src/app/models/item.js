import Sequelize, { Model } from 'sequelize';

class Item extends Model {
    static init(sequelize) {
        super.init({

            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true 
            },
            
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            value: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        }, 
        {
            sequelize
        }
        );

        return this;
    }

    static associate (models) {

        /* Relations (1, N) Item -> Resource */
        this.hasMany(models.Resource, {as: 'itens', foreignKey: 'item_id', onDelete: 'CASCADE'});
    }

}

export default Item;