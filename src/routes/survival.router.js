const router = require('./config.router');
const survivalHandlers = require('../handlers/survival.handlers');

module.exports = [

    router.post('/api/v1/survival', survivalHandlers.create)

];
