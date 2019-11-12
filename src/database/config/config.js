require('dotenv').config({path: process.cwd() + '/environments/.env'});
const path = require('path');

module.exports = {
 
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: path.resolve(__dirname, '../database.sqlite'),
  dialect: "sqlite",
  define: {
    freezeTableName: true,
    timestamps: true
  }

};
