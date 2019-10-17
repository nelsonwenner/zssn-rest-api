const survivorModel = require('../models/Survivor');
const inventoryModel = require('../models/Inventory');
const locationModel = require('../models/Location');

const create = async (survivorData) => {
    const survivor = new survivorModel(survivorData);
    return await survivor.save();
}

const listAll = async () => {
    const attributesLocation = ['latitude', 'longitude']
    const attributesSurvivor = ['survivorId', 'isInfected', 'name', 'age', 'sex']
    const attributesInventory = ['water', 'food', 'medication', 'ammunition', 'points']
    return await survivorModel.findAll({attributes: attributesSurvivor ,include: [
    {as: 'inventory', model: inventoryModel, attributes: attributesInventory}, 
    {as: 'lastLocation', model: locationModel, attributes: attributesLocation}]});
}

const getInstance = async (id) => {
    const attributesInventory = ['inventoryId', 'water', 'food', 'medication', 'ammunition']
    return await survivorModel.findOne({where: {survivorId: id}, include: 
    [{as: 'inventory', model: inventoryModel, attributes: attributesInventory}]});
}

const infectedOrNotInfected = async (isInfected) => {
    return await survivorModel.count({where: {isInfected: isInfected }});
}

const sumAllItems = async () => {
    const data = {'water': 0.0, 'food': 0.0, 'medication': 0.0, 'ammunition': 0.0};
    const inventorys = await survivorModel.findAll({where: {isInfected: false}, 
    include: [{as: 'inventory', model: inventoryModel}]});
    
    inventorys.forEach(({ inventory }) => {
        data['water'] += inventory.water;
        data['food'] += inventory.food;
        data['medication'] += inventory.medication;
        data['ammunition'] += inventory.ammunition;
    });
    return data;
}

const amountPointsInfected = async () => {
    return await survivorModel.sum('points', {where: {isInfected: true}, 
    include: [{as: 'inventory', model: inventoryModel}]});
}

module.exports = { create, listAll, getInstance, infectedOrNotInfected, sumAllItems, amountPointsInfected };
