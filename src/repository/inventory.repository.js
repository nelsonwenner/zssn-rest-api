const inventoryModel = require('../models/Inventory');

const create = async (data) => {
    const invetory = new inventoryModel(data);
    return await invetory.save();
}

const calcPoints = (json) => {
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

const verifyValuesInventory = (dataBody, myInventory) => {
    const keysBody = Object.keys(dataBody);
    let verify = [];
    keysBody.forEach((key) => {
        if (myInventory[key] >= dataBody[key]) verify.push(true);
    });
    if (verify.length == keysBody.length) return true;
    return false;
}

const listAll = async () => {
    return await inventoryModel.findAll({});
}

module.exports = { create, calcPoints, verifyValuesInventory, listAll };