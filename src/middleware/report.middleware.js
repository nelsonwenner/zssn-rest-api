const survivalRepository = require('../repository/survival.repository');
const { verifyParams  } = require('../validator/inventory.validator');
const { LOCATION_ATTRIBUTES } = require('../utils/attributes');

const { 
    ERROR_ATTRIBUTS_INVALID,
    ERROR_SURVIVORS_NOT_EXISTS,
    ERROR_ATTRIBUTES_EMPTY,
    ERROR_SURVIVOR_REPORT,
    ERROR_SURVIVAL_INFECTED
} = require('../utils/errorTypes');

const validatorReport = async (request, response, next) => {
    
    try {
        
        const { sender, target } = request.body;
        
        if (!verifyParams(request.body, LOCATION_ATTRIBUTES)) {
            throw new Error(ERROR_ATTRIBUTS_INVALID);
        }
        
        if (sender == 'undefined' ||
            sender == ''          ||
            target == 'undefined' ||
            target == '') {
            
            throw new Error(ERROR_ATTRIBUTES_EMPTY);
        }

        const senderSurvival = await survivalRepository.getInstance(sender);
        const targetSurvival = await survivalRepository.getInstance(target);

        if (senderSurvival == null || targetSurvival == null) {
            throw new Error(ERROR_SURVIVORS_NOT_EXISTS);
        }

        if (senderSurvival.dataValues.survivalId  == 
            targetSurvival.dataValues.survivalId) {
            throw new Error(ERROR_SURVIVOR_REPORT);
        }

        if (senderSurvival.dataValues.isInfected == true ||
            targetSurvival.dataValues.isInfected == true) {
            throw new Error(ERROR_SURVIVAL_INFECTED);
        }

        request.body = {sender: senderSurvival, target: targetSurvival};

        next();

    } catch (error) {
        switch (error.message) {
            case ERROR_ATTRIBUTS_INVALID:
                return response.status(400).json({error: ERROR_ATTRIBUTS_INVALID});
            case ERROR_SURVIVORS_NOT_EXISTS:
                return response.status(404).json({error: ERROR_SURVIVORS_NOT_EXISTS});
            case ERROR_ATTRIBUTES_EMPTY:
                return response.status(400).json({error: ERROR_ATTRIBUTES_EMPTY});
            case ERROR_SURVIVOR_REPORT:
                return response.status(400).json({error: ERROR_SURVIVOR_REPORT});
            case ERROR_SURVIVAL_INFECTED:
                return response.status(400).json({error: ERROR_SURVIVAL_INFECTED});
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

module.exports = { validatorReport };