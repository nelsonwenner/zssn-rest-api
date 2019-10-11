const locationModel = require('../models/Location');
const survivalModel = require('../models/Survival');

const create = async (data) => {
    const location = new locationModel(data);
    return await location.save();
}

const update = async (id, data) => {
    const dataSurvival = await survivalModel.findOne(
    {where: {survivalId: id}, include: [{as: 'lastLocation', model: locationModel}]});
    const { lastLocation } = dataSurvival.dataValues;
    lastLocation.latitude = data.latitude;
    lastLocation.longitude = data.longitude;
    return await lastLocation.save();
}

module.exports = { create, update };