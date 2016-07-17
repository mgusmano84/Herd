var orm = require('../config/orm.js'); 
var passport = require('passport');
var passportLocal = require('passport-local');
var encrypto = require('crypto');
var salt = 'salt orsomething';
var password;
var newPass;


module.exports = function(app){

	
	// route to post to the login page
	app.post('/login', passport.authenticate('local',{successRedirect: '/dashboard',
														failureRedirect:'/'}));
	// logout
	app.get('/logout', function(req, res){
 		req.logout();
  		res.redirect('/');
	});

	app.post('/register', function(req, res){

		// create register promise
		var register = new Promise(function(resolved, rejected) {

			password = req.body.password;

			//encrypting the password using crypto and a seed
				//newPass = encrypto.createHmac('sha256', password).digest('hex');
			newPass = encrypto.createHmac('sha256', password).update(salt).digest('hex');


			// creates data in MySQL for the new user
			orm.addUser(req.body.email, newPass, req.body.userName, req.body.firstName, req.body.lastName, req.body.image, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.phone);

			// make sure that above code gets resolved
			resolved();

		// this is what is run when the promise is resolved
		}).then(function() {  
			
			// sends true to allow user to login
			res.send(true);

		// this is what is run when the promise is rejected
		}, function() {

			// sends false so user can't login NO LOGIN FOR YOU!
			res.send(false);

		}); // end of register promise

	}); // end of app.post /register
	

	app.post('/creategroup', function(req, res){

		// creates data in MySQL for a new group
		orm.addGroup(req.body.name, req.body.description, req.body.createdBy);

	});

	app.get('/', function(req, res){
		if(req.isAuthenticated()){
		res.render('user',{
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
		} else{res.render('home')}
		
	});



	app.get('/dashboard',  function(req, res){
 	if(req.isAuthenticated()){
		res.render('user',{
			layout: 'usermain',
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	} else{res.redirect('/') }


	});

	//default route 
	app.use(function(req, res){

		res.render('home');
	});
}
