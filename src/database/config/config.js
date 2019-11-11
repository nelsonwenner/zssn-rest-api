
module.exports = {

  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: "sqlite",
  storage: process.cwd() + '/src/database/database.sqlite',
  define: {
    freezeTableName: true
  }
}