var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/authdemo');
 
app.use(require('express-session')({
	secret: 'One and two Im jumpin the waves',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
	//res.send('ok');
	res.render('home');
});


app.get('/secret', function(req, res) {
	res.render('secret');
});

// show registration form
app.get('/register', function(req, res) {
	res.render('register');
});

// user registration
app.post('/register', function(req, res) {

	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function() {
			res.redirect('/secret');
		});
	});

});


// show login form
app.get('/login', function(req, res) {
	res.render('login');
});

// user login
app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login'
}), function(req, res) {
});


// user logout
app.get('/logout', function(req, res) {
	req.logout(); // passport destroys user data in the session
	res.redirect('/');
});




app.listen(PORT, process.env.IP, function(){
	console.log('app started on port', PORT);
});