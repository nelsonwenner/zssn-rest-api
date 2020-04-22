import itemRepository from '../repositories/item.repository';


class ItemHandler {

    async store(req, res) {

        try {
            
            const data = req.body;
            const item = await itemRepository.create(data);
            return res.status(201).json(item);

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }

    async index(req, res) {

        try {
            
            const item = await itemRepository.listAll();
            return res.status(200).json(item);

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new ItemHandler();