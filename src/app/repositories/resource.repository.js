import inventoryModel from '../models/inventory';
import resourceModel from '../models/resource';
import survivorModel from '../models/survivor';
import locationModel from '../models/location';
import itemModel from '../models/item';


class ResourceRepository {

    async create(data) {
        return await resourceModel.create(data);
    }

    async sum(infected) {
        const data = {'Fiji Water': 0.0, 'Campbell Soup': 0.0, 'First Aid Pouch': 0.0, 'AK47': 0.0};
        const inventories = await survivorModel.findAll({where: {infected: infected}, include: [
            {as: 'last_location', model: locationModel},
            {as: 'inventory', model: inventoryModel, include: [
                {as: 'resources', model: resourceModel, include: [
                    {as: 'item', model: itemModel },
                ]},
            ]}
        ]})

        inventories.forEach(({ inventory }) => {
            inventory.resources.forEach((resource) => {
                data[`${resource.item.name}`] += resource.quantity;
            });
        });
        return data;
    }
}

export default new ResourceRepository();