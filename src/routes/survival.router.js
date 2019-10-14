const survivalHandlers = require('../handlers/survival.handlers');
const middlewareFlag = require('../middleware/flag.middleware');
const middlewareTrade = require('../middleware/trade.middleware');
const router = require('./config.router');

module.exports = [
    
    router.post('/api/v1/survivals/', survivalHandlers.create),
    router.get('/api/v1/survivals/', survivalHandlers.listAll),
    router.patch('/api/v1/survivals/flags/', middlewareFlag.validatorFlag, survivalHandlers.flag),
    router.put('/api/v1/survivals/trades/', middlewareTrade.validatorTrade, survivalHandlers.trade),
    router.get('/api/v1/reports/', survivalHandlers.report)
    
];
