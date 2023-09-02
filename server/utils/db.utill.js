const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = require('../config/key');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('director-dashboard', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });



  module.exports = {
    db: sequelize
  }