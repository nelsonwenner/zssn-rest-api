const locationHandlers = require('../handlers/LocationHandler');
const middlewareLocation = require('../middleware/LocationMiddleware');
const router = require('./config.router');

module.exports = [

    router.put('/api/v1/survivors/locations/', middlewareLocation.validatorUpdatePasition, locationHandlers.updateLocation)

];
