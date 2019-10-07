const locationModel = require('../models/Location');
const survivalModel = require('../models/Survival');

const create = async (data) => {
    const location = new locationModel(data);
    return await location.save();
}

const update = async (id, data) => {
    let dataModel = await locationModel.findOne({where: {locationId: id}, include: [{as: 'survival', model: survivalModel}]});
    dataModel.latitude = data.latitude;
    dataModel.longitude = data.longitude;
    return await dataModel.save();
}

module.exports = { create, update };