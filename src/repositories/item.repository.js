import itemModel from '../models/item';


class ItemRepository {

    async create(data) {
        return await itemModel.create(data);
    }

    async exists(id) {
        return await itemModel.findByPk(id);
    }

    async notExistsItens(array) {
        let count = 0;
        const promisses = array.map(async (current, index) => {
            const item = await this.exists(current.item);
            if (!item) { count++; }
        });
        await Promise.all(promisses);
        if (count) { return true; }
        return false;
    }
}

export default new ItemRepository();