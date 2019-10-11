const Survival = require('../models/Survival');
const Inventory = require('../models/Inventory');
const Location  = require('../models/Location');

/*

force = {force: true}

Inventory.sync(force);
Location.sync(force);
Survival.sync(force);

const db = require('./sqlite3.service');

db.sync();

*/