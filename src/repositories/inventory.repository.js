import inventoryModel from '../models/inventory';

class InventoryRepository {

    async create(data) {
        return await inventoryModel.create(data);
    }
}

export default new InventoryRepository(); 