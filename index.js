const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const keys = require('./config/keys');

//const localAuthRouter = require('./routes/local-auth-router');
//const registrationRouter = require('./routes/registration-router');

require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(morgan((keys.NODE_ENV === 'production') ? 'tiny' : 'common' ));
app.use(cors());
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/expenseRoutes')(app);
require('./routes/budgetRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
