import survivorRepository from '../repository/SurvivorRepository';
import yup from 'yup';

import { 
    ERROR_ATTRIBUTS_INVALID,
    ERROR_SURVIVORS_NOT_EXISTS,
    ERROR_ATTRIBUTES_EMPTY,
    ERROR_SURVIVOR_REPORT,
    ERROR_SURVIVAL_INFECTED,
    ERROR_IDS_EQUALS
} from '../utils/errorTypes';

class FlagMiddleware {

    async validatorFlag(request, response, next) {

        const schema = yup.object().shape({
            sender_id: yup.number().integer().positive().required(),
            target_id: yup.number().integer().positive().required()
        });
    
        try {
            
            const { sender_id, target_id } = request.body;
    
            if (!(await schema.isValid(request.body))) {
                throw new Error(ERROR_ATTRIBUTS_INVALID);
            }
    
            if (sender_id == target_id) {
                throw new Error(ERROR_IDS_EQUALS);
            }
    
            const senderSurvivor = await survivorRepository.getInstance(sender_id);
            const targetSurvivor = await survivorRepository.getInstance(target_id);
    
            if (senderSurvivor == null || targetSurvivor == null) {
                throw new Error(ERROR_SURVIVORS_NOT_EXISTS);
            }
    
            if (senderSurvivor.dataValues.survivor_id  == 
                targetSurvivor.dataValues.survivor_id) {
                throw new Error(ERROR_SURVIVOR_REPORT);
            }
    
            if (senderSurvivor.dataValues.infected == true ||
                targetSurvivor.dataValues.infected == true) {
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
                case ERROR_IDS_EQUALS:
                    return response.status(400).json({error: ERROR_IDS_EQUALS});
                case error.message:
                    return response.status(401).json({error: error.message });
            }
        }
    }
}

export default new FlagMiddleware();