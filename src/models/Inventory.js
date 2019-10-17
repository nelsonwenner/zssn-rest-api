const Sequelize = require('sequelize');
const db = require('../service/sqlite3.service');

const model = {

    inventoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },

    points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

    water: {
        type: Sequelize.INTEGER(),
        defaultValue: 0
    },

    food: {
        type: Sequelize.INTEGER(),
        defaultValue: 0
    },

    medication: {
        type: Sequelize.INTEGER(),
        defaultValue: 0
    },

    ammunition: {
        type: Sequelize.INTEGER(),
        defaultValue: 0
    },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}

const Inventory = db.define('inventory', model);

module.exports = Inventory;