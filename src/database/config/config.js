import { config } from 'dotenv';

config({path: process.cwd() + '/environments/.env'});

/*
module.exports = {
 
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: process.cwd() + '/database.sqlite',
  dialect: "sqlite",
  define: {
    freezeTableName: true,
    timestamps: true
  }

};
*/


export default {
 
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: process.cwd() + '/src/database/database.sqlite',
  dialect: "sqlite",
  define: {
    freezeTableName: true,
  }
};

