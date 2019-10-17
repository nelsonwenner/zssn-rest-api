const Sequelize = require('sequelize');
const db = require('../service/sqlite3.service');
const Inventory = require('./Inventory');
const Location = require('./Location');

const model = {
    
    survivorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },
    
    inventoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: 'Inventory',
            key:  'inventoryId',
            as: 'inventory',
        }
    },

    locationId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: 'Location',
            key: 'locationId',
            as: 'lastLocation',
        }
    },
    
    isInfected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    flags: {
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

}

const Survivor = db.define('survivor', model);

/* Relations 1:1 */
Survivor.hasOne(Inventory, {as: 'inventory', foreignKey: 'inventoryId', onDelete: 'cascade'});

/* Relations 1:1 */
Survivor.hasOne(Location, {as: 'lastLocation', foreignKey: 'locationId', onDelete: 'cascade'});

module.exports = Survivor;