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
		failureRedirect:'/', failureMessage: 'Invalid username or password.'}));
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
		orm.addGroup(req.body.name, req.body.description, req.user.firstName);
		orm.joinCreatedGroup(req.user.userID)
		res.send(true);
	});

	app.get('/', function(req, res){
		if(req.isAuthenticated()){
			res.render('user',{
				isAuthenticated: req.isAuthenticated(),
				user: req.user
			});
		} else{
			res.render('home', {loginErr: req.session.messages ? req.session.messages[0] : ""});
		}
		
	});

	app.post('/search', function(req, res){
		
		console.log(req.body);
		console.log(req.body.search);
		
		orm.searchTable('groups','groupName',req.body.search, res, req.user);
		
	});

	app.get('/search/:groupId', function(req, res){

		var group = req.params.groupId;

		// search if you are a member of this group
		var userId = orm.searchUsersInGroup(group);

		console.log("userId = " + userId);

		
		// var inGroup = false;

		// for (i = 0; i < userId.length; i++) {
		// 	console.log("userId[i} = " + userId[i]);
		// 	if (req.user.userID == userId[i]) {
		// 		inGroup = true;
		// 		break;
		// 	}
		// }
		// console.log("inGroup = " + inGroup);

		/*var groupInfo = */orm.displayGroup('groups', 'groupID', group, 'displayGroup', res, req.user);

		res.render('results',{ layout: 'usermain',
		 						results: result,
		 						user: user,
		 						inGroup: userId
		 					    });


		//res.render('displayGroup'/*, {GroupName: groupInfo.groupName}*/);

	});

	app.post('/join', function(req, res){
		console.log(req.group);
		orm.addGroupMember(req.body.group, req.user.userID);
	});

	app.post('/leave', function(req, res) {
		orm.deleteUserGroup(req.body.groupId, req.user);
	})

	app.get('/dashboard',  function(req, res){
 	if(req.isAuthenticated()){
		res.render('user',{
			layout: 'usermain',
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	} else{res.redirect('/') }


	});

	// this url lists the groups a user is currently in
	app.get('/dashboard/yourgroups', function(req, res) {
		
		console.log(req.user.userID);

		// calls the orm that searches the database for all the groups you are in
		orm.searchUserGroups(req.user, res);

	}); // end of app.get/dashboard/yourgroups

	app.post('/driver', function(req,res){
		console.log(req.body.groupName);
		orm.addDriver(req.body.groupName, req.user.firstName, req.body.seats, req.body.info)
		res.send(true);
	})

	//default route 
	app.use(function(req, res){

		res.render('home');
	});
}
