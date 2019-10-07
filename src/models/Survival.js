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
    /*
    inventoryId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Inventory',
            key:  {allowNull: false},
            onDelete: 'cascade'
        }
    },

    locationId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Location',
            key: {allowNull: false},
            onDelete: 'cascade'
        }
    },
    */
    isInfected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
Survival.hasOne(Inventory, {as: 'inventory', foreignKey: 'InventoryId', onDelete: 'cascade'});

/* Relations 1:1 */
Survival.hasOne(Location, {as: 'lastLocation', foreignKey: 'LocationId', onDelete: 'cascade'});

module.exports = Survival;