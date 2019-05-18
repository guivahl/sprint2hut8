const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
require('dotenv/config');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();
//passaport config
require('./config/passport')(passport);
//body parser
app.use(bodyParser.json());
app.use(express.urlencoded({
	extended:false
}));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// express session

app.use(session({
	cookie:{
    secure: true,
    maxAge:60000
       },
	store: new RedisStore(),
	secret: 'secret',
	saveUninitialized: true,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//import routes
const postsRoute = require ('./routes/posts.js');
const indexRoute = require ('./routes/index.js');
const usersRoute = require ('./routes/users.js');

//middlewares
app.use('/posts', postsRoute);
app.use('/users', usersRoute);
app.use('/', indexRoute);

mongoose.connect(process.env.DB_CONNECTION,
	{ useNewUrlParser: true},
	()=> console.log('connected to db'));

app.listen(PORT);