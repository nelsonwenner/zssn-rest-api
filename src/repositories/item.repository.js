import itemModel from '../models/item';

class ItemRepository {

    async create(data) {
        return await itemModel.create(data);
    }
}

export default new ItemRepository();