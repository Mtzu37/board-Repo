const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT || 1337,
  db: {
    database: process.env.DB_NAME || 'heroku_ba9289c47662677',
    user: process.env.DB_USER || 'b7587e587674a8',
    password: process.env.DB_PASS || '79199bcc',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'eu-cdbr-west-02.cleardb.net',
      port: process.env.DB_PORT || '3306'
    }
  }
}
