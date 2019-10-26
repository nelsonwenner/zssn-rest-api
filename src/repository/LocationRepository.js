const locationModel = require('../models/Location');
const survivorModel = require('../models/Survivor');

class LocationRepository {

    async create(data) {
        const location = new locationModel(data);
        return await location.save();
    }

    async update(id, data) {
        const dataSurvivor = await survivorModel.findOne(
        {where: {survivor_id: id}, include: [{as: 'last_location', model: locationModel}]});
        const { last_location } = dataSurvivor.dataValues;
        last_location.latitude = data.latitude;
        last_location.longitude = data.longitude;
        return await last_location.save();
    }

}

module.exports = new LocationRepository();