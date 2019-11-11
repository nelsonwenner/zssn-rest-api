import databaseConfig from '../database/config/config';
import Inventory from '../models/Inventory';
import Survivor from '../models/Survivor';
import Location from '../models/Location';
import Sequelize from 'sequelize';

const models = [Survivor, Inventory, Location];

class Connection {
    constructor() {
        this.init();
    }
    
    init() {
        this.connection = new Sequelize(databaseConfig);
        
        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));

        this.connection.authenticate().then((msg) => {
            console.log("\nDatabase started successfully\n");
        });
    }
}

export default new Connection();