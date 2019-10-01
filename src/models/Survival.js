const Sequelize = require('sequelize');
const db = require('../service/sqlite3.service');
const Inventory = require('./ Inventory');

const model = {
    
    id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },

    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },

    age: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
    },

    sex: {
        type: Sequelize.STRING(9),
        allowNull: false,
    },

    lastPlace: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

}

const Survival = db.define('survival', model);

// Relations 1:1
Survival.hasOne(Inventory);

module.exports = Survival;