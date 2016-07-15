var orm = require('../config/orm.js'); 

module.exports = function(app){

	// route to post to the login page
	app.post('/login', function(req, res){

		

	});

	app.post('/register', function(req, res){

		// create register promise
		var register = new Promise(function(resolved, rejected) {

			// creates data in MySQL for the new user
			orm.addUser(req.body.email, req.body.password, req.body.userName, req.body.firstName, req.body.lastName, req.body.image, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.phone);

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

		res.render('home');
	});

	//default route 
	app.use(function(req, res){

		res.render('home');
	});
}