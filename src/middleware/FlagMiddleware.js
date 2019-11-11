import survivorRepository from '../repository/SurvivorRepository';
import notice from '../utils/errorTypes';
import * as Yup from 'yup';

class FlagMiddleware {

    async validatorFlag(request, response, next) {

        const schema = Yup.object().shape({
            sender_id: Yup.number().integer().positive().required(),
            target_id: Yup.number().integer().positive().required()
        });
    
        try {
            
            const { sender_id, target_id } = request.body;
    
            if (!(await schema.isValid(request.body))) {
                throw new Error(notice.ERROR_ATTRIBUTS_INVALID);
            }
    
            if (sender_id == target_id) {
                throw new Error(notice.ERROR_IDS_EQUALS);
            }
    
            const senderSurvivor = await survivorRepository.getInstance(sender_id);
            const targetSurvivor = await survivorRepository.getInstance(target_id);
    
            if (senderSurvivor == null || targetSurvivor == null) {
                throw new Error(notice.ERROR_SURVIVORS_NOT_EXISTS);
            }
    
            if (senderSurvivor.dataValues.survivor_id  == 
                targetSurvivor.dataValues.survivor_id) {
                throw new Error(notice.ERROR_SURVIVOR_REPORT);
            }
    
            if (senderSurvivor.dataValues.infected == true ||
                targetSurvivor.dataValues.infected == true) {
                throw new Error(notice.ERROR_SURVIVAL_INFECTED);
            }
    
            request.body = {sender: senderSurvivor, target: targetSurvivor};
    
            next();
    
        } catch (error) {
            switch (error.message) {
                case notice.ERROR_ATTRIBUTS_INVALID:
                    return response.status(400).json({error: notice.ERROR_ATTRIBUTS_INVALID});
                case notice.ERROR_SURVIVORS_NOT_EXISTS:
                    return response.status(404).json({error: notice.ERROR_SURVIVORS_NOT_EXISTS});
                case notice.ERROR_ATTRIBUTES_EMPTY:
                    return response.status(400).json({error: notice.ERROR_ATTRIBUTES_EMPTY});
                case notice.ERROR_SURVIVOR_REPORT:
                    return response.status(400).json({error: notice.ERROR_SURVIVOR_REPORT});
                case notice.ERROR_SURVIVAL_INFECTED:
                    return response.status(400).json({error: notice.ERROR_SURVIVAL_INFECTED});
                case notice.ERROR_IDS_EQUALS:
                    return response.status(400).json({error: notice.ERROR_IDS_EQUALS});
                case error.message:
                    return response.status(401).json({error: error.message });
            }
        }
    }
}

export default new FlagMiddleware();