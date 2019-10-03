const router = require('./config.router');
const survivalHandlers = require('../handlers/survival.handlers');
const middlewareSurvival = require('../validator/survival.middleware');
const middlewareTrade = require('../validator/trade.middleware');

module.exports = [

    router.post('/api/v1/survival', survivalHandlers.create),
    router.get('/api/v1/survival', survivalHandlers.listAll),
    router.put('/api/v1/survival/:id', middlewareSurvival.validatorUpdatePlace, survivalHandlers.updateLocation),
    router.put('/api/v1/survival/:survival01_id/trade/:survival02_id', middlewareTrade.validatorTrade, survivalHandlers.trade)

];
