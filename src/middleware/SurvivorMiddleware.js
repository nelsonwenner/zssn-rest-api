import notice from '../utils/errorTypes';
import * as Yup from 'yup';

class SurvivorMiddleware {
    
    async validatorSurvivor (request, response, next) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            age: Yup.number().integer().positive().required(),
            sex: Yup.string().required(),
    
            inventory: Yup.object().shape({
                water: Yup.number().integer().positive().required(),
                food: Yup.number().integer().positive().required(),
                medication: Yup.number().integer().positive().required(),
                ammunition: Yup.number().integer().positive().required()
            }),
            
            location: Yup.object().shape({
                latitude: Yup.number().required(),
                longitude: Yup.number().required()
            })
        });
        
        try {
            
            if (!(await schema.isValid(request.body))) {
               throw new Error(notice.ERROR_VALIDATION);
            }
            
            next();
            
        } catch (error) {
            switch (error.message) {
                case notice.ERROR_VALIDATION:
                    return response.status(400).json({error: notice.ERROR_VALIDATION});
            }
        }
    }
}

export default new SurvivorMiddleware();