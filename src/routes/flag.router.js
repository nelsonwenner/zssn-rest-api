import flagMiddleware from '../middlewares/flag.middleware';
import flagHandler from '../handlers/flag.handler';
import router from './config.router';


export default [

    router.post('/:sender_id/flags/:target_id/', flagMiddleware.flag, flagHandler.store),
    router.get('/flags/', flagHandler.index),

]
