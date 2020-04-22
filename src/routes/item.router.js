import itemHandler from '../app/handlers/item.handler';
import router from './config.router';

export default [

    router.post('/itens/', itemHandler.store),
    router.get('/itens/', itemHandler.index),
    
]
