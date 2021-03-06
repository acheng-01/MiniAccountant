const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );

    app.get(
        '/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['public_profile']
        })
    );

    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook'),
        (req, res) => {
            res.redirect('/dashboard')
        }
    );

    app.get(
        '/api/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    );

    app.get(
        '/api/current_user',
        (req, res) => {
            res.send(req.user)
        }
    );
};