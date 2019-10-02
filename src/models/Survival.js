const Sequelize = require('sequelize');
const db = require('../service/sqlite3.service');
const Inventory = require('./Inventory');

const model = {
    
    survival_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },

    inventory_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'inventory',
            key: 'inventory_id',
            onDelete: 'cascade'
        }
    },

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

    latitude: {
        type: Sequelize.STRING(10),
        allowNull: false
    },

    longitude: {
        type: Sequelize.STRING(10),
        allowNull: false
    },

    lastPlace: {
        type: Sequelize.STRING(50),
        defaultValue: 'latitude: 0, longitude: 0'
    },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

}

const Survival = db.define('survival', model);

/* Relations 1:1 */
Survival.hasOne(Inventory, {as: 'Inventory', foreignKey: 'inventory_id', onDelete: 'cascade'});

module.exports = Survival;