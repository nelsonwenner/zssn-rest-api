const Sequelize = require('sequelize');
const db = require('../service/sqlite3.service');

const model = {
    
    locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },

    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: null,
    },
    
    longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: null
    },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

}

const Location = db.define('location', model);

module.exports = Location;