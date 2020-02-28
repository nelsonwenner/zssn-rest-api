import inventoryHandler from '../handlers/inventory.handler';
import router from './config.router';

export default [

    router.post('/inventories/', inventoryHandler.store),

]
