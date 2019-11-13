import inventoryHandlers from '../handlers/InventoryHandler';
import middlewareTrade from '../middleware/TradeMiddleware';
import router from './config.router';

export default [
    
    router.put('/api/v1/survivors/trades/', middlewareTrade.validatorTrade, inventoryHandlers.trade),
    router.get('/api/v1/inventorys/', inventoryHandlers.listAll)
    
]
