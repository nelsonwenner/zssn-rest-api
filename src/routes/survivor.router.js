const survivorHandlers = require('../handlers/survivor.handlers');
const middlewareFlag = require('../middleware/flag.middleware');
const router = require('./config.router');

module.exports = [
    
    router.post('/api/v1/survivors/', survivorHandlers.create),
    router.get('/api/v1/survivors/', survivorHandlers.listAll),
    router.put('/api/v1/survivors/flags/', middlewareFlag.validatorFlag, survivorHandlers.flag),
    router.get('/api/v1/reports/', survivorHandlers.report)
    
];
