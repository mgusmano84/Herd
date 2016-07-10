var orm = require('./config/orm.js'); 

module.exports = function(app){

	app.get('/login', function(req, res){

		
	});

	app.post('/login', function(req, res){


	});

	app.get('/register', function(req, res){


	});

	app.post('/register', function(req, res){


	});

	app.get('/', function(req, res){

		res.render('home');
	});

	app.use(function(req, res){

		res.render('home');
	});

}