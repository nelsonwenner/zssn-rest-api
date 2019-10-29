const Sequelize = require('sequelize');
const config = require('../database/config/config');
const Survivor = require('../models/Survivor');
const Location = require('../models/Location');
const Inventoy = require('../models/Inventory');

console.log("\nMode: ", process.env.NODE_ENV);

class Connection {
    constructor() {
        this.connect = this.init();
    }
    
    init () {
        let connection = new Sequelize(config[process.env.NODE_ENV]);

        Survivor.init(connection);
        Inventoy.init(connection);
        Location.init(connection);

        Survivor.associate(connection.models);

        connection.authenticate().then((msg) => {
            console.log("\nDatabase started successfully\n");
        });

        return connection;
    }
}

module.exports = new Connection();