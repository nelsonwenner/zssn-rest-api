import tradeMiddleware from '../middlewares/trade.middleware';
import inventoryHandler from '../handlers/inventory.handler';
import router from './config.router';


export default [

    router.post('/inventories/', inventoryHandler.store),
    router.post('/:sender_id/trades/:target_id/', tradeMiddleware.trade, inventoryHandler.trade)

]
