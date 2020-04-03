import databaseConfig from '../config/config';
import inventoryModel from '../app/models/inventory';
import survivorModel from '../app/models/survivor';
import locationModel from '../app/models/location';
import resourceModel from '../app/models/resource';
import flagModel from '../app/models/flag';
import itemModel from '../app/models/item';
import Sequelize from 'sequelize';

const models = [survivorModel, locationModel, itemModel, inventoryModel, resourceModel, flagModel];

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