require('dotenv').config({path: process.cwd() + '/environments/.env'});
require('../service/sqlite3.service');
const Server = require('./Server');

class Index {
    constructor() {
        this.init();
    }

    init () {
        Server.use(require('../routes/index.router'));
    }
}

new Index();