import survivorModel from '../models/survivor';
import locationModel from '../models/location';
import inventoryModel from '../models/inventory';
import resourceModel from '../models/resource';
import itemModel from '../models/item';


class SurvivorRepository {

    async create(data) {
        return await survivorModel.create(data);
    }

    async listAll() {
        const attributesResource = ['resource_id', 'inventory_id', 'item_id', 'quantity']
        const attributesSurvivor = ['survivor_id', 'infected', 'name', 'age', 'sex']
        const attributesLocation = ['location_id', 'latitude', 'longitude']
        const attributesInventory = ['inventory_id', 'survivor_id']
        const attributesItem = ['item_id', 'name']
       
        return await survivorModel.findAll({attributes: attributesSurvivor, include: [
            {as: 'last_location', model: locationModel, attributes: attributesLocation},
            {as: 'inventory', model: inventoryModel, attributes: attributesInventory, include: [
                {as: 'resources', model: resourceModel, attributes: attributesResource, include: [
                    {as: 'item', model: itemModel, attributes: attributesItem },
                ]},
            ]}
        ]});
    }
    
    async get(id) {
        return await survivorModel.findByPk(id, {include: [
            {as: 'inventory', model: inventoryModel, include: [
                {as: 'resources', model: resourceModel, include: [
                    {as: 'item', model: itemModel},
                ]},
            ]}
        ]});
    }

    async infectedOrNotInfected(isInfected) {
        return await survivorModel.count({where: {infected: isInfected}});
    }
    
    async isInfected(id) {
        return await survivorModel.findOne({where: {suvivor_id: id, infected: true}});
    }
}

export default new SurvivorRepository();