(function(){

	'use strict';

	var registrationIndex = require('./../utilities/RegistrationIndex');
	var express = require('express');
	var	router = express.Router();
	var fs = require('fs');
	var authorizationToken = 'setupe2016';


	function registerUser(registrationObject) {

		var errors = [];

		if(!registrationObject.hasOwnProperty('ValidationToken')) {

			errors.push(registrationObject);
			errors.push("Null or Undefined ValidationToken");			
		}		
		else if(registrationObject.ValidationToken !== authorizationToken) {

			errors.push("Invalid Validation Token: " + registrationObject.ValidationToken);
		}

		if(!registrationObject.FirstName) {

			errors.push("Mising first name");
		}

		if(!registrationObject.LastName) {

			errors.push("Missing last name");
		}


		if(!registrationObject.Phone) {

			errors.push("Missing phone");
		}


		if(!registrationObject.Email) {

			errors.push("Missing email");
		}
		else if(registrationIndex.UserExists(registrationObject.Email)) {

			errors.push("User name already exists: " + registrationObject.Email);
		}


		if(!registrationObject.Password) {

			errors.push("Missing password");
		}


		if(errors.length > 0) {

			return {

				RegistrationSuccess : false,
				Errors : errors
			};
		}
		else {

			return registrationIndex.AddUser({

				FirstName : registrationObject.FirstName,
				LastName : registrationObject.LastName,
                Email : registrationObject.Email,
                Phone : registrationObject.Phone,
                Password : registrationObject.Password,
                Shifts : []
			});
		}
	}


	function secureUsers(_users) {

		for(var i = 0; i < _users.length; ++i) {

			delete _users[i].Password;
		}

		return _users;
	}


	router.get('/users/:AuthorizationToken', function(req, res) {

		var auth = req.params.AuthorizationToken;
		console.log("users.get >> AuthToken: " + auth);
		var users = null;

		if(auth === authorizationToken) {

			fs.readFile('./utilities/users.json', 'utf8', function(err, data) {

				if(err) throw err;

				users = JSON.parse(data);

				users = secureUsers(users);

				res.status(200).send(users);
			});
		}
		else {

			res.status(500).send("Invalid authorization token: " + auth);
		}
	});


	router.post('/users', function(req, res) {

		var registrationObject = req.body;

		var validationResult = registerUser(registrationObject);

		res.status(200).send(validationResult);
	});




	module.exports = router;

}());
