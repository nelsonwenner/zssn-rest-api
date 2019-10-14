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

const infectedOrNotInfected = async (isInfected) => {
    return await survivalModel.count({where: {isInfected: isInfected }});
}

const sumAllItems = async () => {
    const data = {'water': 0.0, 'food': 0.0, 'medication': 0.0, 'ammunition': 0.0};
    const inventorys = await survivalModel.findAll({where: {isInfected: false}, 
    include: [{as: 'inventory', model: inventoryModel}]});
    
    inventorys.forEach(({ inventory }) => {
        data['water'] += inventory.water;
        data['food'] += inventory.food;
        data['medication'] += inventory.medication;
        data['ammunition'] += inventory.ammunition;
    });
    return data;
}

module.exports = { create, listAll, getInstance, infectedOrNotInfected, sumAllItems };
