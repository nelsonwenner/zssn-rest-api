import notice from '../utils/errorTypes';
import * as Yup from 'yup';

class LocationMiddleware {
    
    async validatorUpdatePasition (request, response, next) {
        
        const schema = Yup.object().shape({
            survivor_id: Yup.number().integer().positive().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required()
        });
    
        try {
            
            if (!(await schema.isValid(request.body))) {
               throw new Error(notice.ERROR_ATTRIBUTS_INVALID);
            }
    
            next();
            
        } catch (error) {
            switch (error.message) {
                case notice.ERROR_ATTRIBUTS_INVALID:
                    return response.status(400).json({error: notice.ERROR_ATTRIBUTS_INVALID});
            }
        }
    }
}

export default new LocationMiddleware();