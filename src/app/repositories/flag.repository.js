import survivorModel from '../models/survivor';
import flagModel from '../models/flag';


class FlagRepository {

    async create(data) {
        return await flagModel.create(data);
    }

    async listAll() {
        const attributesSurvivor = ['survivor_id', 'infected', 'name', 'age', 'sex']
        const attributesFlag = ['flag_id', 'sender_id', 'target_id']
        return await flagModel.findAll({attributes: attributesFlag, include: [
            {as: 'senders', model: survivorModel, attributes: attributesSurvivor},
            {as: 'flaggeds', model: survivorModel, attributes: attributesSurvivor}
        ]});
    }
    
    async existFlag(sender_id, target_id) {
        return await flagModel.findOne({where: {sender_id: sender_id, target_id: target_id}});
    }

    async countFlags(id) {
        return await flagModel.count({where: {target_id: id}});
    }
}

export default new FlagRepository(); 