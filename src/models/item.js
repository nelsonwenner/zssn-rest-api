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
         
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, 
        {
            sequelize
        }
        );

        return this;
    }

    /* Relations (1, N) Item -> Resource */
    static associate (models) {
        this.hasMany(models.Resource, {as: 'itens', foreignKey: 'item_id', onDelete: 'CASCADE'});
    }

}

export default Item;