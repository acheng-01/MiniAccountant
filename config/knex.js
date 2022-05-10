const knex = require('knex');
const keys = require('./keys');

const db = knex({
    client: 'pg',
    connection: keys.DATABASE_URL
});

module.exports = db;