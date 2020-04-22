import survivorRepository from '../repositories/survivor.repository';
import flagRepository from '../repositories/flag.repository';
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
                references: { model: 'survivors', key: 'survivor_id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            target_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'survivors', key: 'survivor_id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        },
        {
            sequelize
        }
        );

        /* This trigger is fired right after inserting the flag in the database */
        this.addHook('afterCreate', async (flag) => {

            const countFlagsTarget = await flagRepository.countFlags(flag.target_id);
           
            if (countFlagsTarget === 5) {
                
                const target = await survivorRepository.get(flag.target_id);
                target.infected = true;
                await target.save();
            }
        });

        return this;
    }
    
    static associate (models) {

        /* Sender Relations (1, 1) Flag -> Survivor */
        this.belongsTo(models.Survivor, {as: 'senders', foreignKey: 'sender_id', onDelete: 'CASCADE'});

        /* Target Relations (1, 1) Flag -> Survivor */
        this.belongsTo(models.Survivor, {as: 'flaggeds', foreignKey: 'target_id', onDelete: 'CASCADE'});
    }
}

export default Flag;