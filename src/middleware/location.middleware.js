const errorTypes = require('../utils/errorTypes');

const validatorUpdatePasition = async (request, response, next) => {
    
    const { survivalId , latitude, longitude } = request.body; 
    
    let keys = Object.keys(request.body);

    if (latitude && longitude != 'undefined' && 
        latitude && longitude != ''          && 
        survivalId != 'undefined'            &&
        survivalId != ''                     &&
        keys.length == 3) {
        
        next();
        
    } else {

        return response.status(400).json({"erros": errorTypes.ERROR_VALIDATOR_UPDATE_PLACE });
    }
}

module.exports = { validatorUpdatePasition };