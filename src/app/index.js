require('dotenv').config({path: process.cwd() + '/environments/.env'});
require('../service/sqlite3.service');

const server = require('./server');

server.use(require('../routes/index.router'));