const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');


router.get('/login', (req,res)=>{
	res.render('login');
});

// register page
router.get('/register', (req,res)=>{
	res.render('register');
});

//register handle
router.post('/register', (req,res)=>{
	const { name, email, password, password2 } = req.body;
	let errors = [];

	//testa se os campos estao preenchidos
	if(!name || !email || !password || !password2){
		errors.push({msg: 'Por favor preencher todos os campos!'});
	}
	//testa senhas
	if(password !== password2){
		errors.push({msg:'Senhas diferentes'});
	}

	if(password.length < 6){
		errors.push({msg:'Senha muito curta, use pelo menos 6 digitos'});
	}

	if(errors.length > 0){
		res.render('register',{
			errors,
			name,
			email,
			password,
			password2
		});

	} else{
		// Validation passed
		User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email já registrado' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Você está registrado e agora pode logar'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Você saiu');
  res.redirect('/users/login');
});

module.exports = router;
