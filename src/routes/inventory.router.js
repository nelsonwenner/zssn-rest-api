const inventoryHandlers = require('../handlers/inventory.handlers');
const middlewareTrade = require('../middleware/trade.middleware');
const router = require('./config.router');

module.exports = [
    
    router.put('/api/v1/survivors/trades/', middlewareTrade.validatorTrade, inventoryHandlers.trade),
    router.get('/api/v1/inventorys/', inventoryHandlers.listAll)
    
];
