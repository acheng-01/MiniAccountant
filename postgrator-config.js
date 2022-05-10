const keys = require('./config/keys');

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": keys.DATABASE_URL
};