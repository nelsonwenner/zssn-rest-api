const path = require('path');
require('dotenv').config({path: process.cwd() + '/environments/.env'});

module.exports = {
 
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: process.env.NODE_ENV === 'test' ? path.resolve(__dirname, '../../../__tests__/database.sqlite') : path.resolve(__dirname, '../database.sqlite'),
  dialect: "sqlite",
  define: {
    freezeTableName: true,
    timestamps: true
  }

};
