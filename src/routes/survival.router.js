const survivalHandlers = require('../handlers/survival.handlers');
const router = require('./config.router');
const middleware = require('../middleware/report.middleware');

module.exports = [
    
    router.post('/api/v1/survivals/', survivalHandlers.create),
    router.get('/api/v1/survivals/', survivalHandlers.listAll),
    router.patch('/api/v1/survivals/reports/', middleware.validatorReport, survivalHandlers.report)
    
];
