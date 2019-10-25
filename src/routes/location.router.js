const locationHandlers = require('../handlers/location.handlers');
const middleware = require('../middleware/location.middleware');
const router = require('./config.router');

module.exports = [

    router.put('/api/v1/survivors/locations/', middleware.validatorUpdatePasition, locationHandlers.updateLocation)

];
