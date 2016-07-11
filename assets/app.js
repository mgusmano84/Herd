$(document).ready(function(){

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
	var userName = $('#userName').val().trim();
	var userPass = $('#password').val().trim();
	console.log(userName);
	console.log(userPass);
	return false;
});

//submits modal form and stores input in user object
$('#registerSubmit').on('click',function(){
	var user = {};
	user.firstName = $('#firstName').val().trim();
	user.lastName = $('#lastName').val().trim();
	user.userName = $('#userName').val().trim();
	user.email = $('#email').val().trim();

	console.log(user);
	return false;
});

//submits modal form and stores input in group object
$('#createSubmit').on('click',function(){
	var group = {};
	group.name = $('#groupName').val().trim();
	group.description = $('#description').val().trim();
	
	console.log(group);
	return false;
});

});