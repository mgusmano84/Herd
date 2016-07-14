// requiring the connection to the db passing in the username and password 
var db = require('./connection.js');

//require('./connection.js')(username, password);

var orm = {

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
	}, // end of addUser function

} // end of orm object

module.exports = orm;
