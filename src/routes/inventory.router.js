import tradeMiddleware from '../app/middlewares/trade.middleware';
import inventoryHandler from '../app/handlers/inventory.handler';
import router from './config.router';


export default [

    router.post('/inventories/', inventoryHandler.store),
    router.post('/:sender_id/trades/:target_id/', tradeMiddleware.trade, inventoryHandler.trade)

]
