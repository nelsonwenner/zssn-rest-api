const errorTypes = require('../utils/errorTypes');

const validatorUpdatePasition = async (request, response, next) => {
    
    const { survivorId , latitude, longitude } = request.body; 
    
    let keys = Object.keys(request.body);

    if (latitude && longitude != 'undefined' && 
        latitude && longitude != ''          && 
        survivorId != 'undefined'            &&
        survivorId != ''                     &&
        keys.length == 3) {
        
        next();
        
    } else {

        return response.status(400).json({"erros": errorTypes.ERROR_VALIDATOR_UPDATE_PLACE });
    }
}

module.exports = { validatorUpdatePasition };