//var connection = require('./connection.js')(username, password);

module.exports = function(username, password) {

	// requiring the connection to the db passing in the username and password 
	var connection = require('./connection.js')(username, password);
	
	//require('./connection.js')(username, password);

}
