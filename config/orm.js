// requiring the connection to the db passing in the username and password 
var db = require('./connection.js');

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
	searchTable: function(tableInput, colToSearch, valOfCol) {
		var queryString = 'SELECT * FROM ' + tableInput + ' WHERE ' + colToSearch + ' = ?';
		connection.query(queryString, [valOfCol], function(err, result) {
			if (err) throw err;
			console.log(result);
		});
	}, // end of searchTable function

	// add a group to a user that is joinable by other users
	addGroup: function(groupName, groupDescription, createdBy) {

		var post = [
			groupName,
			groupDescription,
			createdBy
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

		var query = db.query('INSERT INTO groupMembers (groupName, memberName) VALUES (?, ?)', post, function(err, result) {
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
		
		var queryString = 'SELECT * FROM users WHERE userName = ' + JSON.stringify(username) + ' AND userPassword = ' + JSON.stringify(pass);
		db.query(queryString, function(err, rows, fields) {
			if (err) throw err;
			
			if (rows[0]) {
				return done(null, {id:rows[0].userName, name: rows[0].firstName });
			} else{
				return done(null,null);
			}
		});
		
		
	}, // finds user by username and password,



} // end of orm object

module.exports = orm;
