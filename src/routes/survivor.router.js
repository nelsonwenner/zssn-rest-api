const survivorHandlers = require('../handlers/SurvivorHandler');
const middlewareFlag = require('../middleware/FlagMiddleware');
const middlewareSurvivor = require('../middleware/SurvivorMiddleware');
const router = require('./config.router');

module.exports = [
    
    router.post('/api/v1/survivors/', middlewareSurvivor.validatorSurvivor, survivorHandlers.store),
    router.get('/api/v1/survivors/', survivorHandlers.listAll),
    router.put('/api/v1/survivors/flags/', middlewareFlag.validatorFlag, survivorHandlers.flag),
    router.get('/api/v1/reports/', survivorHandlers.report)
    
];
