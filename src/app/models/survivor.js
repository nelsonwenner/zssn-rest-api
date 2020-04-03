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
        }, 
        {
            sequelize
        }
        );

        return this;
    }

    static associate (models) {

        /* Relations (1, 1) Survivor -> Location */
        this.belongsTo(models.Location, {as: 'last_location', foreignKey: 'survivor_id', onDelete: 'CASCADE'});

        /* Relations (1, 1) Survivor -> Inventory */
        this.belongsTo(models.Inventory, {as: 'inventory', foreignKey: 'survivor_id', onDelete: 'CASCADE'});
    }
}

export default Survivor;