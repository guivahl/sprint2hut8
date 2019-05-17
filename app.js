const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
require('dotenv/config');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

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
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//connect flash
app.use(flash());

//messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});


//import routes
const postsRoute = require ('./routes/posts');
const indexRoute = require ('./routes/index');
const usersRoute = require ('./routes/users');

//middlewares
app.use('/posts', postsRoute);
app.use('/users', usersRoute);
app.get('/', indexRoute);

mongoose.connect(process.env.DB_CONNECTION,
	{ useNewUrlParser: true},
	()=> console.log('connected'));

app.listen(PORT);