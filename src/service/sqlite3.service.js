const Sequelize = require('sequelize');
const Survivor = require('../models/Survivor');
const Location = require('../models/Location');
const Inventoy = require('../models/Inventory');

const autenticateDataBase = {
    database: process.env.SQLITE3_DB,
    username: process.env.SQLITE3_USER,
    password: process.env.SQLITE3_PASSWORD,
    dialect: 'sqlite',
    storage: process.cwd() + "/src/database/database.sqlite",
    define : {
        freezeTableName: true
    }
};

class Connection {
    constructor() {
        this.init();
    }
    
    init () {
        let connection = new Sequelize(autenticateDataBase);

        Survivor.init(connection);
        Inventoy.init(connection);
        Location.init(connection);

        Survivor.associate(connection.models);

        connection.authenticate().then((msg) => {
            console.log("\nDatabase started successfully\n");
        });
    }
}

module.exports = new Connection();