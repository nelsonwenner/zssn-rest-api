
module.exports = {

  development: {
    database: process.env.SQLITE3_DB,
    username: process.env.SQLITE3_USER,
    password: process.env.SQLITE3_PASSWORD,
    dialect: "sqlite",
    storage: process.cwd() + '/src/database/database.sqlite',
    define: {
      freezeTableName: true
    }
  },

  tests: {
    database: process.env.SQLITE3_DB,
    username: process.env.SQLITE3_USER,
    password: null,
    dialect: "sqlite",
    storage: process.cwd() + '/src/database/tests.sqlite',
    logging: false,
    define : {
        freezeTableName: true
    }
  }  
}
