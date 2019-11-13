import Inventory from '../models/Inventory';

class InventoryRespository {

    async create(data) {
        const invetory = new Inventory(data);
        return await invetory.save();
    }

    calcPoints(json) {
        let keys = Object.keys(json);
        let points = 0;
        keys.forEach((key) => {
            if (key == 'water') points += json[key] * 4;
            else if (key == 'food') points += json[key] * 3;
            else if (key == 'medication') points += json[key] * 2;
            else if (key == 'ammunition') points += json[key] * 1;
        });
        return points;
    }

    verifyValuesInventory(dataBody, myInventory) {
        const keysBody = Object.keys(dataBody);
        let verify = [];
        keysBody.forEach((key) => {
            if (myInventory[key] >= dataBody[key]) verify.push(true);
        });
        if (verify.length == keysBody.length) return true;
        return false;
    }

    async listAll() {
        return await Inventory.findAll({});
    }

}

export default new InventoryRespository();