const router = require('./config.router');
const survivalHandlers = require('../handlers/survival.handlers');
const midlleware = require('../validator/survival.midlleware');

module.exports = [

    router.post('/api/v1/survival', survivalHandlers.create),
    router.get('/api/v1/survival', survivalHandlers.listAll),
    router.put('/api/v1/survival/:id', midlleware.validatorUpdatePlace, survivalHandlers.updatePlace)

];
