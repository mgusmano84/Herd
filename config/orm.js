

module.exports = function(username, password) {

	// requiring the connection to the db passing in the username and password 
	var connection = require('./connection.js')(username, password);

	//require('./connection.js')(username, password);

	var orm = {
		addUser: function(userEmail, password, user, firstN, lastN, image, userAddress, userCity, userState, userZip, phone) {

			var post = {
				email: userEmail, 
				userPassword: password,
				userName: user,
				firstName: firstN,
				lastName: lastN,
				userImage: image,
				address: userAddress,
				city: userCity,
				state: userState,
				zip: userZip,
				phoneNumber: phone
			};

			var query = connection.query('INSERT INTO users SET ?', post, function(err, result) {
				console.log(result);
			});
			console.log(query.sql)
		}, // end of addUser function
	}; // end of orm object

} // end of module.exports
