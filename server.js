// requires express and body-parser
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSessions = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');


// creating an instance of express
var app = express();
var PORT = process.env.PORT || 3000; // assigning the port or using the PORT environment variable


// makes static content in assets accessible
app.use(express.static(process.cwd() + '/assets'));	


// require orm - mysql queries
var orm = require('./config/orm.js');

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

app.use(cookieParser());
app.use(expressSessions({secret: 'secret'}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done) {
	console.log(username,password) // DO WE NEED THIS????
	if (username === password) {
		done(null, {id: username, name: username});
	} else{
		done(null,null);
	}
	
}))

passport.serializeUser(function(user,done){
	done(null, user.id);
})

passport.deserializeUser(function(id,done){
	done(null,{id:id, name: id });
})


//require routes
require('./routing/html-routes.js')(app);



//starts the server letting user know the PORT
app.listen(PORT, function(){

	console.log("listening on port %d", PORT);
});