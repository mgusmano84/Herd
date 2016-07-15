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

passport.use(new passportLocal.Strategy({passReqToCallback : true}, function(req, username, password, done) {
	console.log(username,password)
	
	orm.findUser(req, username, password, done);
	
}))

passport.serializeUser(function(user,done){
	done(null, user);
})

passport.deserializeUser(function(user,done){
	done(null, user);
})


//require routes
require('./routing/html-routes.js')(app, orm);
require('./routing/api-routes.js')(app, orm);




//starts the server letting user know the PORT
app.listen(PORT, function(){

	console.log("listening on port %d", PORT);
});