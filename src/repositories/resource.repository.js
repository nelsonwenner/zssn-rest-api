import resourceModel from '../models/resource';

class ResourceRepository {

    async create(data) {
        return await resourceModel.create(data);
    }
}

export default new ResourceRepository();