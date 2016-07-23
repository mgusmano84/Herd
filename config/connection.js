// require mysql 
var mysql = require('mysql');

// retrieving the username and password for the db connection
var username = process.argv[2];
var password = process.argv[3];

//creating the connection to the db
var connection = mysql.createConnection(process.env.JAWSDB_URL);


//sql local connection
// mysql.createConnection({
// 	host: 'localhost',
// 	user: username,
// 	password: password,
// 	database: 'carPool'
// });


//jaws DB connection
// mysql.createConnection(process.env.JAWSDB_URL);

// if fail to connect display the error otherwise if successful give the connection id
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

// 	function(err){

// 	if(err){
// 		return console.log(err);
// 	}
// 	console.log('connection id: %d', connection.threadId);
// });

module.exports = connection;


