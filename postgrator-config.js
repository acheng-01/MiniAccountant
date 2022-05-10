const keys = require('./config/keys');

module.exports = {
    "migrationPattern": "migrations",
    "driver": "pg",
    "connectionString": keys.DATABASE_URL
};