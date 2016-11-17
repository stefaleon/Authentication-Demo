var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');


mongoose.connect('mongodb://localhost/authdemo');

app.use(require('express-session')({
	secret: 'One and two Im jumpin the waves',
	resave: false,
	saveUninitialized: false
}));

app.set('view-engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
	//res.send('ok');
	res.render('home.ejs');
});


app.get('/secret', function(req, res) {
	res.render('secret.ejs');
});

app.listen(PORT, process.env.IP, function(){
	console.log('app started on port', PORT);
});