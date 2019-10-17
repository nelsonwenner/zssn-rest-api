const locationRepository = require('../repository/location.repository');

const updateLocation = async (request, response) => {

    try {
        
        const { survivorId, ...locations } = request.body;
        
        const updated = await locationRepository.update(survivorId, locations);
        
        return response.status(200).json({updated});
        
    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

module.exports = { updateLocation };