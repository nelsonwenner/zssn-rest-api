const survivorHandlers = require('../handlers/survivor.handlers');
const middlewareFlag = require('../middleware/flag.middleware');
const middlewareSurvivor = require('../middleware/survivor.middleware');
const router = require('./config.router');

module.exports = [
    
    router.post('/api/v1/survivors/', middlewareSurvivor.validatorSurvivor, survivorHandlers.create),
    router.get('/api/v1/survivors/', survivorHandlers.listAll),
    router.put('/api/v1/survivors/flags/', middlewareFlag.validatorFlag, survivorHandlers.flag),
    router.get('/api/v1/reports/', survivorHandlers.report)
    
];
