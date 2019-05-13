const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')

require('dotenv/config');

app.use(bodyParser.json());

//import routes
const postsRoute = require ('./routes/posts')

//middlewares
app.use('/posts', postsRoute);

app.get('/',(req,res)=>{
	res.send('We are on home');
});

mongoose.connect(process.env.DB_CONNECTION,
	{ useNewUrlParser: true},
	()=> console.log('connected'));

app.listen(3000);