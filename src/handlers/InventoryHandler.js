import inventoryRepository from '../repository/InventoryRepository';

class InventoryHandler {
        
    async trade(request, response) {

        try {

            const { sender, target } = request.body;
            
            sender.keysItens.forEach(key => {
                sender.inventory[key] -= sender.requestInventory[key];
                target.inventory[key] += sender.requestInventory[key];
            });

            target.keysItens.forEach(key => {
                target.inventory[key] -= target.requestInventory[key];
                sender.inventory[key] += target.requestInventory[key];
            });

            Promise.all([
                sender.inventory.save(), 
                target.inventory.save()
            ]);

            return response.status(200).json({sender: sender.inventory, targer: target.inventory});

        } catch (error) {
            switch (error.message) {
                case error.message:
                    return response.status(401).json({error: error.message });
            }
        }
    }

    async listAll (request, response) {

        try {

            const data = await inventoryRepository.listAll();
            return response.status(200).json(data);

        } catch (error) {
            switch (error.message) {
                case error.message:
                    return response.status(401).json({error: error.message });
            }
        }
    }
}


export default new InventoryHandler();