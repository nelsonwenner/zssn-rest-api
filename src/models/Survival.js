const Sequelize = require('sequelize');
const db = require('../service/sqlite3.service');
const Inventory = require('./Inventory');
const Location = require('./Location');

const model = {
    
    survivalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },
    
    inventoryId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Inventory',
            key:  'inventoryId',
            as: 'inventory',
            onDelete: 'set null'
        }
    },

    locationId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Location',
            key: 'locationId',
            as: 'lastLocation',
            onDelete: 'set null'
        }
    },
    
    isInfected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    reportsCount: {
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

const Survival = db.define('survival', model);

/* Relations 1:1 */
Survival.hasOne(Inventory, {as: 'inventory', foreignKey: 'inventoryId', onDelete: 'set null'});

/* Relations 1:1 */
Survival.hasOne(Location, {as: 'lastLocation', foreignKey: 'locationId', onDelete: 'set null'});

module.exports = Survival;