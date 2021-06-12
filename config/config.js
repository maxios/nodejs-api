const { database_username, database_password } = require('./env');

module.exports = {
  "development": {
    "fawry_charge": "https://atfawry.fawrystaging.com//ECommerceWeb/Fawry/payments/charge",
    "database": "sheikh_alamoud_development",
    "host": "localhost",
    "dialect": "postgres",
    "username": 'maxios',
    "password": 'khalidmaxios',
    "define": {
      "charset": 'utf8',
      "collate": 'utf8_general_ci'
    },
  },
  "production": {
    "fawry_charge": "https://www.atfawry.com/ECommerceWeb/Fawry/payments/charge",
    "username": 'alamoud',
    "password": 'alamoud',
    "database": "sheikh_alamoud_production",
    "host": "localhost",
    "dialect": "postgres",
    "define": {
      "charset": 'utf8',
      "collate": 'utf8_general_ci'
    },
  }
}
