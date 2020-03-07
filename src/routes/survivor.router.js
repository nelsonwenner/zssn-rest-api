import survivorValidator from '../validators/survivor.validator';
import survivorHandler from '../handlers/survivor.handler';
import router from './config.router';

export default [

    router.post('/survivors/', survivorValidator, survivorHandler.store),
    router.get('/survivors/', survivorHandler.index),
    router.get('/reports/', survivorHandler.report),

]
