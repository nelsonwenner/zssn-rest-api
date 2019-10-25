const survivor = require('./survivor.router');
const location = require('./location.router');
const inventory = require('./inventory.router');

module.exports = [

    survivor,
    inventory,
    location

];