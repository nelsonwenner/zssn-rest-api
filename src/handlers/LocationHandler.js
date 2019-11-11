import locationRepository from '../repository/LocationRepository';

class LocationHandler {
        
    async updateLocation(request, response) {

        try {
            
            const { survivor_id, ...locations } = request.body;
            
            const updated = await locationRepository.update(survivor_id, locations);
            
            return response.status(200).json({updated});
            
        } catch (error) {
            switch (error.message) {
                case error.message:
                    return response.status(401).json({error: error.message });
            }
        }
    }
}

export default new LocationHandler();