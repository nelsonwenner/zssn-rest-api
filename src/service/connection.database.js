import databaseConfig from '../database/config/config';
import inventoryModel from '../models/inventory';
import survivorModel from '../models/survivor';
import locationModel from '../models/location';
import resourceModel from '../models/resource';
import itemModel from '../models/item';
import Sequelize from 'sequelize';

const models = [survivorModel, locationModel, inventoryModel, itemModel, resourceModel];

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