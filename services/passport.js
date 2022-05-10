const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');

const authService = require('./authService');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await authService.findUserByGoogleId(profile.id);

            if (existingUser) {
                return done(null, existingUser);
            }

            const { sub, given_name, family_name } = profile._json;
            const user = {
                google_id: sub,
                first_name: given_name,
                last_name: family_name
            };

            const newUser = await authService.createUser(user);
            done(null, newUser);
        }
    )
)

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: '/auth/facebook/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await authService.findUserByFacebookId(profile.id);

            if (existingUser) {
                return done(null, existingUser);
            }

            const { name, id } = profile._json;
            const parsedName = name.split(' ');
            const first_name = parsedName.shift();
            let last_name = '';
            for (i of parsedName) {
                last_name += i;
            }
            const user = {
                facebook_id: profile.id,
                first_name,
                last_name
            };

            const newUser = await authService.createUser(user);
            done(null, newUser);
        }
    )
)