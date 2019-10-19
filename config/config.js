module.exports = {
  "development": {
    "username": process.env.SHAM_DATABASE_USERNAME,
    "password": process.env.SHAM_DATABASE_PASSWORD,
    "database": "sheikh_alamoud_development",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.SHAM_DATABASE_USERNAME,
    "password": process.env.SHAM_DATABASE_PASSWORD,
    "database": "sheikh_alamoud_production",
    "host": "localhost",
    "dialect": "postgres",
  }
}
