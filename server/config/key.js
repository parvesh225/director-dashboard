require('dotenv').config();

module.exports = {
    PORT     : process.env.PORT,
    BASE_URL : process.env.BASE_URL,
    DB_HOST     : process.env.HOST,
    DB_USERNAME : process.env.USERNAME,
    DB_PASSWORD : process.env.PASSWORD,
    DB_NAME : process.env.DATABASE
}