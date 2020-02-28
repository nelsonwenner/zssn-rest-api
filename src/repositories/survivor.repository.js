import survivorModel from '../models/survivor';
import locationModel from '../models/location';

class SurvivorRepository {

    async create(data) {
        return await survivorModel.create(data);
    }

    async listAll() {
        return await survivorModel.findAll({include: 
        [{as: 'last_location', model: locationModel}]});
    }
}

export default new SurvivorRepository();