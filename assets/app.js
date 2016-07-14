$(document).ready(function(){
var app = {
	currentURL: window.location.origin,
	userAuth:{},
	user:{},
}


//login click function starts login modal
$('#login').on('click',function(){
	$('#loginModal').modal('show');
});

//register click function starts register modal
$('#register').on('click',function(){
	$('#registerModal').modal('show');
});

//create group click function starts create group modal
$('#create').on('click',function(){
	$('#createModal').modal('show');

});

//on click for group search grabs input and posts as search
$('#searchSubmit').on('click',function(){
	if ($("#search")[0].checkValidity()){
		
		var searchTerm = $('#search').val().trim();
		
		$.get(app.currentURL + "/search", {search: searchTerm},
		    function(data){
		    	//TO DO do somthing with results of search
		    });

		return false;
	}
	else{
		$("#search")[0].reportValidity()
	}
});

//click function allows user to join the group, posts userAuth info and the name of the group to be joined*******Needs to then add that group to user's groups on the page***
$('#join').on('click',function(){
	
		$.post(app.currentURL + "/join", {user: userAuth,
			group: $('#groupName').data('name')},
		    function(data){
		    	//add group to users groups 
		    });

		return false;

});

//submits modal form and stores input in variables
$('#loginSubmit').on('click',function(){
	if ($("#loginForm")[0].checkValidity()){
		
		app.userAuth.userName = $('#user').val().trim();
		app.userAuth.userPass = $('#pass').val().trim();
		//post login attempt
		$.post(app.currentURL + "/login", app.userAuth,
		    function(data){
		    	// TO DO...If login success... render user home page.
		    	if(data == true){
		    		
		    	}
		    });

		return false;
	}
	else{
		$("#loginForm")[0].reportValidity()
	}
});

//submits and posts form data for first time login
$('#successLoginSubmit').on('click',function(){
	if ($("#loginForm")[0].checkValidity()){
		
		app.userAuth.userName = $('#firstLogUser').val().trim();
		app.userAuth.userPass = $('#firstLogPass').val().trim();
		//post login attempt
		$.post(app.currentURL + "/login", app.userAuth,
		    function(data){
		    	// TO DO...If login success... render user home page.
		    	if(data == true){
		    		
		    	}
		    });

		return false;
	}
	else{
		$("#loginForm")[0].reportValidity()
	}
});

//submits modal form and stores input in user object
$('#registerSubmit').on('click',function(){
	if ($("#regForm")[0].checkValidity()){
		
		app.user.firstName = $('#firstName').val().trim();
		app.user.lastName = $('#lastName').val().trim();
		app.user.userName = $('#userName').val().trim();
		app.user.email = $('#email').val().trim();
		app.user.image = $('#img').val().trim();
		app.user.password = $('#password').val().trim();
		app.user.address = $('#address').val().trim();
		app.user.city = $('#city').val().trim();
		app.user.state = $('#state').val().trim();
		app.user.zip = $('#zip').val().trim();
		app.user.phone = $('#phone').val().trim();

		//post user acount
		$.post(app.currentURL + "/register", app.user,
		    function(data){
		    	// If creation success... show login modal with success message.
		    	if(data == true){
		    		$('#registerModal').modal('hide');
		    		$('#loginModal').modal('show');
		    	}
		    });

		console.log(app.user);
		return false;
	}
	else{
		$("#regForm")[0].reportValidity()
	}
});

//submits modal form and stores input in group object
$('#createSubmit').on('click',function(){
	if ($("#createForm")[0].checkValidity()){
		var group = {};
		group.name = $('#groupName').val().trim();
		group.description = $('#description').val().trim();
		// TO DO***** group.createdBy = ;*******need to group userName that is creating group

		//post group
		$.post(app.currentURL + "/creategroup", group,
		    function(data){
		    	console.log(data);
		    });

		console.log(group);
		return false;
	}
	else{
		$("#createForm")[0].reportValidity()
	}
});

});