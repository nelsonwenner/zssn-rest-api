const survivorRepository = require('../repository/survivor.repository');
const { verifyParams  } = require('../validator/inventory.validator');
const { LOCATION_ATTRIBUTES } = require('../utils/attributes');

const { 
    ERROR_ATTRIBUTS_INVALID,
    ERROR_SURVIVORS_NOT_EXISTS,
    ERROR_ATTRIBUTES_EMPTY,
    ERROR_SURVIVOR_REPORT,
    ERROR_SURVIVAL_INFECTED
} = require('../utils/errorTypes');

const validatorFlag = async (request, response, next) => {
    
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

        const senderSurvivor = await survivorRepository.getInstance(sender);
        const targetSurvivor = await survivorRepository.getInstance(target);

        if (senderSurvivor == null || targetSurvivor == null) {
            throw new Error(ERROR_SURVIVORS_NOT_EXISTS);
        }

        if (senderSurvivor.dataValues.survivorId  == 
            targetSurvivor.dataValues.survivorId) {
            throw new Error(ERROR_SURVIVOR_REPORT);
        }

        if (senderSurvivor.dataValues.isInfected == true ||
            targetSurvivor.dataValues.isInfected == true) {
            throw new Error(ERROR_SURVIVAL_INFECTED);
        }

        request.body = {sender: senderSurvivor, target: targetSurvivor};

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

module.exports = { validatorFlag };