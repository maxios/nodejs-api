const { database_username, database_password, database_name, database_host } = require('./env');

module.exports = {
  "development": {
    "fawry_charge": "https://atfawry.fawrystaging.com//ECommerceWeb/Fawry/payments/charge",
    "username": database_username,
    "password": database_password,
    "database": database_name,
    "host": database_host,
    "dialect": "postgres",
    "define": {
      "charset": 'utf8',
      "collate": 'utf8_general_ci'
    },
  },
  "production": {
    "fawry_charge": "https://www.atfawry.com/ECommerceWeb/Fawry/payments/charge",
    "username": database_username,
    "password": database_password,
    "database": database_name,
    "host": database_host,
    "dialect": "postgres",
    "define": {
      "charset": 'utf8',
      "collate": 'utf8_general_ci'
    },
  }
}
