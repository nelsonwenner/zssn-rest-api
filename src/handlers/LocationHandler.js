const locationRepository = require('../repository/LocationRepository');

const updateLocation = async (request, response) => {

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

module.exports = { updateLocation };