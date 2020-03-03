import inventoryModel from '../models/inventory';


class InventoryRepository {

    async create(data) {
        return await inventoryModel.create(data);
    }

    verifyInventoryValues(resourcesToAnalyze, yoursResources) {
        const itemNotFound = [];
        const verify = [];
        
        resourcesToAnalyze.map((data, index) => {
            if (!!(yoursResources.find(resource => resource.item_id === data.item && 
                resource.quantity >= data.quantity))) {
                verify.push(1);
            } else {
                itemNotFound.push(0);
            }
        });
        if (verify.length === yoursResources.length &&
            itemNotFound.length === 0) {
            return false;
        }
        return true;        
    }
}

export default new InventoryRepository(); 