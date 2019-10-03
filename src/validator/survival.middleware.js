const errorTypes = require('../utils/errorTypes');

const validatorUpdatePlace = async (request, response, next) => {
    
    const { latitude, longitude } = request.body; 
    
    let keys = Object.keys(request.body);

    if (latitude && longitude != 'undefined' && latitude && longitude != '' && keys.length == 2) {

        next();
        
    } else {

        return response.status(400).json({"erros": errorTypes.ERROR_VALIDATOR_UPDATE_PLACE });
    }
}

module.exports = { validatorUpdatePlace };