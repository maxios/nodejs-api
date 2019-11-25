module.exports = {
  "development": {
    "username": process.env.SHAM_DATABASE_USERNAME,
    "password": process.env.SHAM_DATABASE_PASSWORD,
    "database": "sheikh_alamoud_development",
    "host": "localhost",
    "dialect": "postgres",
    "define": {
      "charset": 'utf8',
      "collate": 'utf8_general_ci'
    },
  },
  "production": {
    "username": process.env.SHAM_DATABASE_USERNAME,
    "password": process.env.SHAM_DATABASE_PASSWORD,
    "database": "sheikh_alamoud_production",
    "host": "localhost",
    "dialect": "postgres",
    "define": {
      "charset": 'utf8',
      "collate": 'utf8_general_ci'
    },
  }
}
