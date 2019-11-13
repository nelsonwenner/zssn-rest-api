import router from '../routes/index.router';
import '../service/database.service';
import { config } from 'dotenv';
import Express from 'express';

config();

class App {
    constructor() {
        this.server = Express();
        this.routes();
    }

    routes() {
        this.server.use(router);
    }
}

export default new App().server;