var orm = require('../config/orm.js'); 

module.exports = function(app){

	// route to post to the login page
	app.post('/login', function(req, res){

		

	});

	app.post('/register', function(req, res){

		var password = req.body.password;
		var username = req.body.userName;

		orm.addUser(req.body.email, password, username, req.body.firstName, req.body.lastName, req.body.image, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.phone);
		console.log("username: " + username + "password " + password);

	});

	app.post('/creategroup', function(req, res){


	});

	app.get('/', function(req, res){

		res.render('home');
	});

	//default route 
	app.use(function(req, res){

		res.render('home');
	});
}