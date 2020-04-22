import inventoryRepository from '../repositories/inventory.repository';


class InventoryHandler {

    async store(req, res) {

        try {
            
            const data = req.body;
            const result = await inventoryRepository.create(data);
            return res.status(201).json(result);

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }

    async trade(req, res) {

        try {
            
            const { sender, target } = req.body;
           
            await Promise.all([

                await inventoryRepository.swap(sender.reqInventory, 
                sender.survivor.inventory.resources, 
                target.survivor.inventory.resources),
            
                await inventoryRepository.swap(target.reqInventory, 
                target.survivor.inventory.resources, 
                sender.survivor.inventory.resources)

            ]);

            return res.status(200).json({
            sender: sender.survivor.inventory.resources, 
            target: target.survivor.inventory.resources});

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new InventoryHandler();