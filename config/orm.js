// requiring the connection to the db passing in the username and password 
var db = require('./connection.js');
var encrypto = require('crypto');
var salt = 'salt orsomething';
var password;
var newPass;


var orm = {

	// Add user using the registration form information
	addUser: function(userEmail, password, user, firstN, lastN, image, userAddress, userCity, userState, userZip, phone) {

		var post = [
			userEmail, 
			password,
			user,
			firstN,
			lastN,
			image,
			userAddress,
			userCity,
			userState,
			userZip,
			phone
		];

		var query = db.query('INSERT INTO users (email, userPassword, userName, firstName, lastName, userImage, address, city, state, zip, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', post, function(err, result) {
			if (err) throw err;
			console.log(result);
		});
		console.log(query.sql)
	}, // end of addUser function

	// ************needs to be added to routes
	// searches different tables based on column and value of the column
	searchTable: function(tableInput, colToSearch, valOfCol,res,user) {
		console.log(valOfCol);
		
		var queryString = 'SELECT * FROM ' + tableInput + ' WHERE ' + colToSearch + ' = ?';
		 db.query(queryString, [valOfCol], function(err, result) {
			if (err) throw err;
			console.log(result);
			res.render('results',{ layout: 'usermain',
		 						results: result,
		 						user: user
		 					    });
		});
		 

	}, // end of searchTable function

	displayGroup: function(table, column, whatToSearch, pageToSendResult, res, user) {

		var queryString = 'SELECT * FROM ' + table + ' WHERE ' + column + ' = ?';

			 db.query(queryString, whatToSearch, function(err, result) {

				if (err) throw err;

				res.render(pageToSendResult, {layout: 'usermain', results: result, user: user});

			});		 						
	}, 

	// add a group to a user that is joinable by other users
	addGroup: function(groupName, groupDescription,user) {

		var post = [
			groupName,
			groupDescription,
			user
		];

		var query = db.query('INSERT INTO groups (groupName, groupDescription, createdBy, meet, pickUp) VALUES (?, ?, ?, false, false)', post, function(err, result) {
			if (err) throw err;
			console.log(result);
		});
		console.log(query.sql)
	}, // end of addGroup function

	// ************needs to be added to routes
	// adds a group member to a group - could be a one line form on the group page to invite others or a join button for the person joining the group
	addGroupMember: function(groupName, memberUserName) {

		var post = [
			groupName,
			memberUserName
		];

		var query = db.query('INSERT INTO groupMembers (groupID, userID) VALUES (?, ?)', post, function(err, result) {
			if (err) throw err;
			console.log(result);
		});
		console.log(query.sql)
	}, // end of addGroupMember function

	// ************needs to be added to routes
	// adds driver to drivers table and presets milesDriven, daysDriving, timeHoursDriving, driverRating since those will be modified in other areas/as they drive more
	addDriver: function(groupName, driverUserName, seatsAvailable) {

		var post = [
			groupName,
			driverUserName,
			seatsAvailable
		];

		var query = db.query('INSERT INTO drivers (groupName, driverUserName, seatsAvailable, milesDriven, daysDriving, timeHoursDriving, driverRating) VALUES (?, ?, ?, 0, 0, 0, null)', post, function(err, result) {
			if (err) throw err;
			console.log(result);
		});
		console.log(query.sql)
	}, // end of adddriver function

	// ************needs to be added to routes
	// adds passengers to a driver most likely on the group page
	addPassengers: function(driverUserName, passengerUserName) {

		var post = [
			driverUserName,
			passengerUserName
		];

		var query = db.query('INSERT INTO passengers (driverUserName, passengerUserName) VALUES (?, ?)', post, function(err, result) {
			if (err) throw err;
			console.log(result);
		});
		console.log(query.sql)
	}, // end of addPassengers function

	//finds user where username and password match user input
	findUser: function(req ,username, pass, done) {
		console.log(username, pass);

		newPass = encrypto.createHmac('sha256', pass).update(salt).digest('hex');
		
		var queryString = 'SELECT * FROM users WHERE userName = ' + JSON.stringify(username) + ' AND userPassword = ' + JSON.stringify(newPass);

		db.query(queryString, function(err, rows, fields) {
			if (err) throw err;
			
			if (rows[0]) {

				return done(null, {userID:rows[0].userID,
								   userName:rows[0].userName, 
								   firstName: rows[0].firstName, 
								   lastName:rows[0].firstName,
								   email:rows[0].email,

								});
			} else{
				return done(null,null);
			}
		});
		
		
	}, // finds user by username and password,

	// searches for all the groups that a user is in
	searchUserGroups: function(user, res) {
		
		var options = {sql: 'root', nestTables: '_'}
		var queryString = 'SELECT groups.groupName, groups.groupID FROM groups JOIN groupMembers ON groups.groupID = groupmembers.groupId JOIN users ON groupMembers.userId = users.userID WHERE users.userID = ?';
		db.query(queryString, [user.userID], function(err, result) {
			if (err) throw err;
			console.log(result);
			res.render('yourgroups',{ layout: 'usermain',
		 						results: result,
		 					    user: user});
			console.log(result);
		}); // end of query

	}, // end of searchUserGroups function

	deleteUserGroup: function(groupId) {
		var queryString = 'DELETE FROM groupMembers WHERE groupId = ? && userId = ?';
		db.query(queryString, [groupId, user.userID], function(err, result) {
			if (err) throw err;
			console.log(result);
		}); // end of query
	}


} // end of orm object

module.exports = orm;
