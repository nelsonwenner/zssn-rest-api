import middlewareSurvivor from '../middleware/SurvivorMiddleware';
import survivorHandlers from '../handlers/SurvivorHandler';
import middlewareFlag from '../middleware/FlagMiddleware';
import router from './config.router';

export default [
    
    router.post('/api/v1/survivors/', middlewareSurvivor.validatorSurvivor, survivorHandlers.store),
    router.get('/api/v1/survivors/', survivorHandlers.listAll),
    router.put('/api/v1/survivors/flags/', middlewareFlag.validatorFlag, survivorHandlers.flag),
    router.get('/api/v1/reports/', survivorHandlers.report)
    
]
