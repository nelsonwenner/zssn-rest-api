import Location from '../models/Location';
import Survivor from '../models/Survivor';

class LocationRepository {
    
    async create(data) {
        const location = new Location(data);
        return await location.save();
    }

    async update(id, data) {
        const dataSurvivor = await Survivor.findOne(
        {where: {survivor_id: id}, include: [{as: 'last_location', model: Location}]});
        const { last_location } = dataSurvivor.dataValues;
        last_location.latitude = data.latitude;
        last_location.longitude = data.longitude;
        return await last_location.save();
    }

}

export default new LocationRepository();