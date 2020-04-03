import flagRespoitory from '../repositories/flag.repository';


class FlagHandler {

    async store(req, res) {
        
        try {
            
            const { sender_id, target_id } = req.params;
            
            const { flag_id } = await flagRespoitory.create(
            {sender_id: sender_id, target_id: target_id});

            return res.status(201).json({flag_id: flag_id});
                
        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }

    async index(req, res) {

        try {
            
            const flags = await flagRespoitory.listAll();

            return res.status(200).json(flags);

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new FlagHandler();