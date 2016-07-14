//seperate from the main .js file so as to not corrupt working code

var source = $("#user-template").html(); 
var template = Handlebars.compile(source); 

var data = {
	//the logged in user, so the data from the #login and #loginModal
	//so whatever info is retrieved from that get
};

//puts the template on the page
$('body').append(template);