const inventoryModel = require('../models/Inventory');

const create = async (data) => {
    const invetory = new inventoryModel(data);
    return await invetory.save();
}

module.exports = { create };