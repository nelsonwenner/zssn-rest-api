import survivorRepository from '../repositories/survivor.repository';
import locationRepository from '../repositories/location.repository';

class SurvivorHandler {

    async store(req, res) {
        
        try {
            
            const { location, ...survivor } = req.body;
            const { survivor_id } = await survivorRepository.create(survivor);
            const result = await locationRepository.create({survivor_id: survivor_id, ...location});
            return res.status(201).json(result);

        } catch (error) {
            switch (error.message) {
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new SurvivorHandler();