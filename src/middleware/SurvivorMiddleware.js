const { ERROR_VALIDATION } = require('../utils/errorTypes');
const yup = require('yup');

class SurvivorMiddleware {
    
    async validatorSurvivor (request, response, next) {

        const schema = yup.object().shape({
            name: yup.string().required(),
            age: yup.number().integer().positive().required(),
            sex: yup.string().required(),
    
            inventory: yup.object().shape({
                water: yup.number().integer().positive().required(),
                food: yup.number().integer().positive().required(),
                medication: yup.number().integer().positive().required(),
                ammunition: yup.number().integer().positive().required()
            }),
            
            location: yup.object().shape({
                latitude: yup.number().required(),
                longitude: yup.number().required()
            })
        });
        
        try {
            
            if (!(await schema.isValid(request.body))) {
               throw new Error(ERROR_VALIDATION);
            }
            
            next();
            
        } catch (error) {
            switch (error.message) {
                case ERROR_VALIDATION:
                    return response.status(400).json({error: ERROR_VALIDATION});
            }
        }
    }
}

module.exports = new SurvivorMiddleware();