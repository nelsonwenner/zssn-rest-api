import itemHandler from '../handlers/item.handler';
import router from './config.router';

export default [

    router.post('/itens/', itemHandler.store),

]
