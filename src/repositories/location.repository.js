import locationModel from '../models/location';


class LocationRepository {

    async create(data) {
        return await locationModel.create(data);
    }
}

export default new LocationRepository();