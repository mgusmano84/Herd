var orm = require('../config/orm.js'); 

module.exports = function(app){

	// route to post to the login page
	app.post('/login', function(req, res){

		

	});

	app.post('/register', function(req, res){

		// creates data in MySQL for the new user
		orm.addUser(req.body.email, req.body.password, req.body.userName, req.body.firstName, req.body.lastName, req.body.image, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.phone);

	});

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