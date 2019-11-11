import router from '../routes/index.router';
import '../service/database.service';
import { config } from 'dotenv';
import Server from './Server';

config();

class Index {
    constructor() {
        this.init();
    }

    init() {
        Server.use(router);
    }
}

new Index();