// require mysql 
var mysql = require('mysql');

/*var username = process.argv[3];
var password = process.argv[4];*/

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
})

module.exports = connection;