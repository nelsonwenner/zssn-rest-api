import { config } from 'dotenv';
import app from './App';

config();

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log('\nServer start with successfully!');
});
  