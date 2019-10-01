const Sequelize = require('sequelize');

const autenticateDataBase = {
    database: process.env.SQLITE3_DB,
    username: process.env.SQLITE3_USER,
    password: process.env.SQLITE3_PASSWORD,
    dialect: 'sqlite',
    storage: process.cwd() + "/database/database.sqlite",
    define : {
        freezeTableName: true
    }
}

const database = new Sequelize(autenticateDataBase);

database.authenticate().then((msg) => {
    console.log("\nDatabase started successfully\n");
});

module.exports = database;