// requires express and body-parser
var express = require('express');
var bodyParser = require('body-parser');

// creating an instance of express
var app = express();
var PORT = process.env.PORT || 3000; // assigning the port or using the PORT environment variable


// TEMPORARY - retrieving the username and password for the db connection
var username = process.argv[2];
var password = process.argv[3];


// require orm - mysql queries
var orm = require('./config/orm.js')(username, password);


// BodyParser interprets data sent to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));


//setting up handlebars
var exphbs = require('express-handlebars');
var hbs = require('handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//require routes
require('./routing/html-routes.js')(app, orm);
require('./routing/api-routes.js')(app, orm);


//starts the server letting user know the PORT
app.listen(PORT, function(){

	console.log("listening on port %d", PORT);
});