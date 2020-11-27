const fs = require('fs');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};