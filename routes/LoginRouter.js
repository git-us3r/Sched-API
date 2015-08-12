(function(){

	'use strict';

	var express = require('express');
	var router = express.Router();
	var registrationIndex = require('./../utilities/RegistrationIndex');

	router.get('/user/:LoginObject', function(req, res) {


		var loginObject = JSON.parse(req.params.LoginObject);
		console.log("LoginRouter >> LoginObject: " + JSON.stringify(loginObject));

		var user = registrationIndex.FindUser(loginObject.UserName, loginObject.Password);

		if(user !== null) {	

			res.status(200).send(user);
		}
		else {

			res.sendStatus(404);
		}
	});


	module.exports = router;

}());