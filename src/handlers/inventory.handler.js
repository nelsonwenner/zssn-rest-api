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
            
            console.log(req.body);
            //return res.status(201).json(result);

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new InventoryHandler();