$(document).ready(function(){
	
//get current url for post methods
var currentURL = window.location.origin;

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

//submits modal form and stores input in variables
$('#loginSubmit').on('click',function(){
	var userAuth = {};
	userAuth.userName = $('#userName').val().trim();
	userAuth.userPass = $('#password').val().trim();
	//post login attempt
	$.post(currentURL + "/api/Oauth", userAuth,
	    function(data){
	    	// TO DO...If login success... render user home page.
	    	if(data == true){
	    		
	    	}
	    });

	return false;
});

//submits modal form and stores input in user object
$('#registerSubmit').on('click',function(){
	var user = {};
	user.firstName = $('#firstName').val().trim();
	user.lastName = $('#lastName').val().trim();
	user.userName = $('#userName').val().trim();
	user.email = $('#email').val().trim();

	//post user acount
	$.post(currentURL + "/api/users", user,
	    function(data){
	    	// If creation success... show login modal with success message.
	    	if(data == true){
	    		$('#registerModal').modal('hide');
	    		$('#successModal').modal('show');
	    	}
	    });

	console.log(user);
	return false;
});

//submits modal form and stores input in group object
$('#createSubmit').on('click',function(){
	var group = {};
	group.name = $('#groupName').val().trim();
	group.description = $('#description').val().trim();

	//post group
	$.post(currentURL + "/api/groups", group,
	    function(data){
	    	console.log(data);
	    });

	console.log(group);
	return false;
});

});