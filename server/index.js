const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();
const port = 3000;
const db = require('./config/mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const passportjwt=require('./config/passport-jwt-strategy')

app.use(cors())
app.use(express.json({limit:'10mb'}));
// app.use(express.urlencoded());
app.use(express.urlencoded({limit:'10mb', extended: true }));
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

//use express router
// app.use('/',require('./routes/index'));
// app.use(bodyParser.urlencoded())

app.use(cookieParser());

//static files
app.use(express.static('./assets'))

//set up the view engine
// app.set('view engine', 'ejs');
// app.set('views', './views')

app.use(session({
    name: 'AdoptConnect',
    secret: 'something',
    saveUninitialized: false,//when user is not logged in then not required to store extra data in cookie
    resave: false,//when identity is establised, not save data repetitively
    cookie: {
        maxAge: (1000 * 60 * 100)//its in milli-seconds(age of cookie)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://admin:abcdefgh@cluster0.zshjdva.mongodb.net/',
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server:${err}`);
    }
    console.log(`server is running on port ${port}`);
})