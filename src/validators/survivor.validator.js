import * as Yup from 'yup';

export default async (req, res, next) => {
    
    try {
        
        const schema =  Yup.object().shape({
            name: Yup.string().required(),
            age: Yup.number().integer().positive().required(),
            sex: Yup.string().required(),
            inventory: Yup.array().of(
                Yup.object().shape({
                    item: Yup.number().integer().positive().required(),
                    quantity: Yup.number().integer().positive().required(),
                }).required()
            ).required(),
            location: Yup.object().shape({
                latitude: Yup.number().max(180).min(-180).required(),
                longitude: Yup.number().max(180).min(-180).required(),
            }).required()
        }).required();
        
        await schema.validate(req.body, { abortEarly: false });
        
        return next();

    } catch (error) {
        switch (error.message) {
            default:
                return res.status(400).json({error: 'Validation fails', messages: error.inner});
        }
    }
}