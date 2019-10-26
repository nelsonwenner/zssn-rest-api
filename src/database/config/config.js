module.exports = {

  "development": {
    "database": process.env.SQLITE3_DB,
    "username": process.env.SQLITE3_USER,
    "password": process.env.SQLITE3_PASSWORD,
    "dialect": "sqlite",
    "storage": "database.sqlite"
  }
}
