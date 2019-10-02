const router = require('./config.router');
const survivalHandlers = require('../handlers/survival.handlers');

module.exports = [

    router.post('/api/v1/survival', survivalHandlers.create),
    router.get('/api/v1/survival/all', survivalHandlers.listAll)

];
