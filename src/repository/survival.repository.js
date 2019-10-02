const survivalModel = require('../models/Survival');
const inventoryModel = require('../models/Inventory');

const create = async (survivalData) => {
    const survival = new survivalModel(survivalData);
    return await survival.save();
}

const listAll = async () => {
    const attributesSurvival = ['survival_id', 'name', 'age', 'sex', 'lastPlace', 'createdAt', 'updatedAt']
    const attributesInventory = ['inventory_id', 'water', 'food', 'medication', 'ammunition']
    return await survivalModel.findAll({attributes: attributesSurvival ,include: [{as: 'Inventory', model: inventoryModel, attributes: attributesInventory}]});
}

module.exports = { create, listAll };
