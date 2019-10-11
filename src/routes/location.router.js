const survivalHandlers = require('../handlers/survival.handlers');
const middleware = require('../middleware/location.middleware');
const router = require('./config.router');

module.exports = [

    router.put('/api/v1/survivals/locations/', middleware.validatorUpdatePasition, survivalHandlers.updateLocation)

];
