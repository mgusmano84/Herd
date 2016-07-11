//seperate from the main .js file so as to not corrupt working code

var source = $("#user-template").html(); 
var template = Handlebars.compile(source); 

var data = {
	//the logged in user, so the data from the #login and #loginModal
};

$('body').append(template);