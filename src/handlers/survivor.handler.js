import survivorRepository from '../repositories/survivor.repository';
import locationRepository from '../repositories/location.repository';
import inventoryRepository from '../repositories/inventory.repository';
import resourceRepository from '../repositories/resource.repository';

class SurvivorHandler {

    async store(req, res) {
        
        try {
            
            const { location, inventory, ...survivor } = req.body;
            const { survivor_id } = await survivorRepository.create(survivor);
            await locationRepository.create({survivor_id: survivor_id, ...location});
            const { inventory_id } = await inventoryRepository.create({survivor_id: survivor_id});

            const promisses = [];

            inventory.forEach(async data => {
                promisses.push(await resourceRepository.create({
                inventory_id: inventory_id, 
                item_id: data.item,
                quantity: data.quantity}));
            });

            await Promise.all(promisses);

            return res.status(201).json({survivor_id: survivor_id});

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new SurvivorHandler();