const { ERROR_ATTRIBUTS_INVALID } = require('../utils/errorTypes');
const yup = require('yup');

const validatorUpdatePasition = async (request, response, next) => {
    
    const schema = yup.object().shape({
        survivorId: yup.number().integer().positive().required(),
        latitude: yup.number().required(),
        longitude: yup.number().required()
    });

    try {
        
        if (!(await schema.isValid(request.body))) {
           throw new Error(ERROR_ATTRIBUTS_INVALID);
        }

        next();
        
    } catch (error) {
        switch (error.message) {
            case ERROR_ATTRIBUTS_INVALID:
                return response.status(400).json({error: ERROR_ATTRIBUTS_INVALID});
        }
    }
}

module.exports = { validatorUpdatePasition };