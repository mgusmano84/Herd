var orm = require('../config/orm.js'); 

module.exports = function(app){

	// route to post to the login page
	app.post('/login', function(req, res){


	});

	app.post('/register', function(req, res){


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