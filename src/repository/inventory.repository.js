const inventoryModel = require('../models/Inventory');

const create = async () => {
    const invetory = new inventoryModel();
    return await invetory.save();
}

module.exports = { create };