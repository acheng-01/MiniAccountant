const db = require('../config/knex');

const authService = {
    findUserByGoogleId: (profileId) => {
        return db
            .select('*')
            .from('users')
            .where({ google_id: profileId })
            .first();
    },

    findUserByFacebookId: (profileId) => {
        return db
            .select('*')
            .from('users')
            .where({ facebook_id: profileId })
            .first();
    },

    createUser: (newUser) => {
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    }
};

module.exports = authService;