const survivalHandlers = require('../handlers/survival.handlers');
const middlewareReport = require('../middleware/report.middleware');
const middlewareTrade = require('../middleware/trade.middleware');
const router = require('./config.router');

module.exports = [
    
    router.post('/api/v1/survivals/', survivalHandlers.create),
    router.get('/api/v1/survivals/', survivalHandlers.listAll),
    router.patch('/api/v1/survivals/reports/', middlewareReport.validatorReport, survivalHandlers.report),
    router.put('/api/v1/survivals/trades/', middlewareTrade.validatorTrade, survivalHandlers.trade)
    
];
