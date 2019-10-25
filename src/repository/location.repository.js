const locationModel = require('../models/Location');
const survivorModel = require('../models/Survivor');

const create = async (data) => {
    const location = new locationModel(data);
    return await location.save();
}

const update = async (id, data) => {
    const dataSurvivor = await survivorModel.findOne(
    {where: {survivorId: id}, include: [{as: 'lastLocation', model: locationModel}]});
    const { lastLocation } = dataSurvivor.dataValues;
    lastLocation.latitude = data.latitude;
    lastLocation.longitude = data.longitude;
    return await lastLocation.save();
}

module.exports = { create, update };