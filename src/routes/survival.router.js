const router = require('./config.router');
const survivalHandlers = require('../handlers/survival.handlers');
//const middlewareSurvival = require('../middleware/survival.middleware');
//const middlewareTrade = require('../middleware/trade.middleware');

module.exports = [
    
    router.post('/api/v1/survivals/', survivalHandlers.create),
    router.get('/api/v1/survivals/', survivalHandlers.listAll),
    router.put('/api/v1/locations/', survivalHandlers.updateLocation),
    router.post('/api/v1/survivals/trades/', survivalHandlers.trade),
    router.delete('/api/v1/tests/', survivalHandlers.tests)

];
