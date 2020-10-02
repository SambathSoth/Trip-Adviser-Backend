if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// PASSWORD CONFIG
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// EXPRESS BODY PASRSER
app.use(express.urlencoded({ extended: true }));

//EXPRESSION SESSION
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// PASSPORD MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//CONNECTION FLASH
app.use(flash());

//GLOBAL VARS
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//IMPORT USER ROUTE
const userRoute = require('./routes/user')
app.use('/users', userRoute)

//IMPORT PROVINCE ROUTE
const provinceRoute = require('./routes/province')
app.use('/provinces', provinceRoute)

//IMPORT PLACE ROUTE
const placeRoute = require('./routes/place')
app.use('/places', placeRoute)

//IMPORT HOTEL ROUTE
const hotelRoute = require('./routes/hotel')
app.use('/hotels', hotelRoute)

//ROUTE
app.use('/', require('./routes/index'))

// DB CONNECTION
mongoose
    .connect(
        process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server started on port ${PORT}`))