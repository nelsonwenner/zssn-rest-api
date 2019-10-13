const survivalModel = require('../models/Survival');
const inventoryModel = require('../models/Inventory');
const locationModel = require('../models/Location');

const create = async (survivalData) => {
    const survival = new survivalModel(survivalData);
    return await survival.save();
}

const listAll = async () => {
    const attributesLocation = ['latitude', 'longitude']
    const attributesSurvival = ['survivalId', 'isInfected', 'name', 'age', 'sex']
    const attributesInventory = ['water', 'food', 'medication', 'ammunition']
    return await survivalModel.findAll({attributes: attributesSurvival ,include: [
    {as: 'inventory', model: inventoryModel, attributes: attributesInventory}, 
    {as: 'lastLocation', model: locationModel, attributes: attributesLocation}]});
}

const getInstance = async (id) => {
    const attributesInventory = ['inventoryId', 'water', 'food', 'medication', 'ammunition']
    return await survivalModel.findOne({where: {survivalId: id}, include: 
    [{as: 'inventory', model: inventoryModel, attributes: attributesInventory}]});
}

module.exports = { create, listAll, getInstance };
