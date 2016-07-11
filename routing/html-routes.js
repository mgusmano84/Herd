//var orm = require('../config/orm.js'); 

module.exports = function(app, orm){

	// route to display the login page
	app.get('/login', function(req, res){

		
	});

	// route to post to the login page
	app.post('/login', function(req, res){


	});

	app.get('/register', function(req, res){


	});

	app.post('/register', function(req, res){


	});

	app.get('/', function(req, res){

		//res.render('home');
		res.render('login');
	});

	//default route 
	app.use(function(req, res){

		//res.render('home');
		res.render('login');
	});

}