

module.exports = function(username, password) {

	// requiring the connection to the db passing in the username and password 
	var connection = require('./connection.js')(username, password);

	//require('./connection.js')(username, password);

	var orm = {

		// addUser: function(userEmail, password, user, firstN, lastN, image, userAddress, userCity, userState, userZip, phone) {

		// 	var post = {
		// 		email: userEmail, 
		// 		userPassword: password,
		// 		userName: user,
		// 		firstName: firstN,
		// 		lastName: lastN,
		// 		userImage: image,
		// 		address: userAddress,
		// 		city: userCity,
		// 		state: userState,
		// 		zip: userZip,
		// 		phoneNumber: phone
		// 	};

		// 	var query = connection.query('INSERT INTO users SET ?', post, function(err, result) {
		// 		console.log(result);
		// 	});
		// 	console.log(query.sql)
		// }, // end of addUser function
		
		addUser: function(userEmail, password, user, firstN, lastN, image, userAddress, userCity, userState, userZip, phone) {
			var queryString = 'INSERT INTO users (email, userPassword, userName, firstName, lastName, userImage, address, city, state, zip, phoneNumber) VALUES (' + userEmail + ', ' + password + ', ' + user + ', ' + firstN + ', ' + lastN + ', ' + image + ', ' + userAddress + ', ' + userCity + ', ' + userState + ', ' + userZip + ', ' + phone + ');';
			console.log(queryString);
			connection.query(queryString, function(err, result) {
				console.log(result);
			});
		}
	} // end of orm object

}
