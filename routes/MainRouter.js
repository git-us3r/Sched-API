(function(){

	'use strict';

	var express = require('express');
	var	router = express.Router();

	router.get('/', function(req, res) {

		res.status(200).send("Try a url of the form https://aqueous-peak-6953.herokuapp.com/auth/userName/password");
	});

	module.exports = router;


}());
