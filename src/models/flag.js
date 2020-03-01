import Sequelize, { Model } from 'sequelize';

class Flag extends Model {
    static init(sequelize) {
        super.init({

            flag_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true 
            },

            sender_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'survivor', key: 'survivor_id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            target_id: {
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

    static associate (models) {

        /* Sender Relations (1, 1) Flag -> Survivor */
        this.belongsTo(models.Survivor, {as: 'flaggers', foreignKey: 'sender_id', onDelete: 'CASCADE'});

        /* Target Relations (1, 1) Flag -> Survivor */
        this.belongsTo(models.Survivor, {as: 'flaggeds', foreignKey: 'target_id', onDelete: 'CASCADE'});
    }
}

export default Flag;