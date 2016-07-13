var orm = require('../config/orm.js'); 

module.exports = function(app){

	// route to post to the login page
	app.post('/login', function(req, res){

		orm.addUser("robertprine2@yahoo.com", "Floop2", "BestDriverNA", "Robert", "Prine", "<img src='https://scontent.ftpa1-2.fna.fbcdn.net/v/t1.0-9/13076924_1720305171578346_5638715548334228214_n.jpg?oh=64b0cf52506fe186373c3fa6901ff5ff&oe=57F78ACC'>", "8464 Lake Waverly Ln", "Orlando", "FL", 32829, "4077919189");

	});

	app.post('/register', function(req, res){

		orm.addUser(req.body.email, req.body.password, req.body.userName, req.body.firstName, req.body.lastName, req.body.image, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.phone);
		console.log(req.body.password + "I'm here!", req.body.userNam + "I'm here");

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