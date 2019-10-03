const survivalModel = require('../models/Survival');
const inventoryModel = require('../models/Inventory');

const create = async (survivalData) => {
    const survival = new survivalModel(survivalData);
    return await survival.save();
}

const listAll = async () => {
    const attributesSurvival = ['survival_id', 'isInfected', 'name', 'age', 'sex', 'latitude', 'longitude', 'lastPlace', 'createdAt', 'updatedAt']
    const attributesInventory = ['inventory_id', 'water', 'food', 'medication', 'ammunition']
    return await survivalModel.findAll({attributes: attributesSurvival ,include: [{as: 'Inventory', model: inventoryModel, attributes: attributesInventory}]});
}

const update = async (id, data, flag) => {
    const dataModel = await survivalModel.findOne({where: {survival_id: id}, include: [{as: 'Inventory', model: inventoryModel}]});

    let keys = Object.keys(data);

    let oldPlace = {'latitude': null, 'longitude': null};

    keys.forEach(item => {

        if (flag && item == 'latitude' || item == 'longitude') {

            if (item == 'latitude') oldPlace[item] = dataModel[item];
            if (item == 'longitude') oldPlace[item] = dataModel[item];

            dataModel[item] = data[item];
            
        }

        dataModel[item] = data[item];
    });

    if (flag) dataModel['lastPlace'] = `latitude: ${oldPlace['latitude']}, longitude: ${oldPlace['longitude']}`;

    return await dataModel.save();
}

const getInstance = async (id) => {
    const attributesInventory = ['water', 'food', 'medication', 'ammunition']
    return await survivalModel.findOne({where: {survival_id: id}, include: [{as: 'Inventory', model: inventoryModel, attributes: attributesInventory}]});
}

module.exports = { create, listAll, update, getInstance };
