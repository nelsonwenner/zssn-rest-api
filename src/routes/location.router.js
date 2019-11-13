import middlewareLocation from '../middleware/LocationMiddleware';
import locationHandlers from '../handlers/LocationHandler';
import router from './config.router';

export default [

    router.put('/api/v1/survivors/locations/', middlewareLocation.validatorUpdatePasition, locationHandlers.updateLocation)

]
