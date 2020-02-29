import survivorHandler from '../handlers/survivor.handler';
import router from './config.router';

export default [

    router.post('/survivors/', survivorHandler.store),
    router.get('/survivors/', survivorHandler.index),

]
