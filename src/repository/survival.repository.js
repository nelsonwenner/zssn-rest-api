const survivalModel = require('../models/Survival');
const inventoryModel = require('../models/Inventory');

const create = async (survivalData) => {
    const survival = new survivalModel(survivalData);
    return await survival.save();
}

const listAll = async () => {
    return await survivalModel.findAll({include: [{as: 'Inventory', model: inventoryModel}]});
}

module.exports = { create, listAll };
