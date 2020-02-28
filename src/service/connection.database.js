import databaseConfig from '../database/config/config';
import SurvivorModel from '../models/survivor';
import LocationModel from '../models/location';
import Sequelize from 'sequelize';

const models = [SurvivorModel, LocationModel];

class ConnectionDatabase {
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

export default new ConnectionDatabase();