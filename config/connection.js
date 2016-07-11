// require mysql 
var mysql = require('mysql');

module.exports = function(username, password){

	//creating the connection to the db
	var connection = mysql.createConnection({
		host: 'localhost',
		user: username,
		password: password,
		database: 'carPool'
	});

	// if fail to connect display the error otherwise if successful give the connection id
	connection.connect(function(err){

		if(err){
			return console.log(err);
		}
		console.log('connection id: %d', connection.threadId);
	});
}

/*
var connection = mysql.createConnection({
	host: 'localhost',
	user: username,
	password: password,
	database: 'carPool'
});

connection.connect(function(err){

	if(err){
		return console.log(err);
	}
	console.log('connection id: %d', connection.threadId);
});

module.exports = connection;
*/