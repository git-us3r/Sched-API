(function(){

	'use strict';

	var fs = require('fs');

	var users = null;

	function load() {

		console.log("load >> attempting to load users .. users: " + users);

		var strUsers = fs.readFileSync('./utilities/users.json').toString();
	    
	    console.log("load >> users loaded: " + strUsers);

	    users = JSON.parse(strUsers);
	}


	function returnUser(index) {

		return {

			FirstName : users[index].FirstName,
			LastName : users[index].LastName,
			Email : users[index].Email,
			Phone : users[index].Phone,
			Shifts : users[index].Shifts
		};
	}
	

	function findUser(userEmail, password) {

		if(users === null) {

			load();
		}

		console.log('RegistrationIndex.FindUser >> checking users for match. User: ' + userEmail + ' Passwrod: ' + password);

		for(var i = 0; i < users.length; ++i) {

			console.log('RegistrationIndex.FindUser >> checking user: ' + users[i].Email + ' pwd: ' + users[i].Password);
			
			var emailCompared = users[i].Email.localeCompare(userEmail);
			var passwordCompared = users[i].Password.localeCompare(password);
			
			console.log('RegistrationIndex.FindUser >> emailCompared : ' + emailCompared);
			console.log('RegistrationIndex.FindUser >> passwordCompared : ' + passwordCompared);

			if(emailCompared === 0 && passwordCompared === 0) {


				console.log('RegistrationIndex.FindUser >> User found');
				return returnUser(i);
			}
		}

		return null;
	}



	function userExists(userEmail) {

		if(users === null) {

			load();
		}

		for(var i = 0; i < users.length; ++i) {

			if(users[i].Email === userEmail) {

				return true
			}
		}

		return false;
	}


	function addUser(userData) {

		if(users === null) {

			load();
		}

		users.push(userData);

		var usersJson = JSON.stringify(users);

        fs.writeFileSync('./utilities/users.json', usersJson);

        return {RegistrationSuccess : true};
        
	}


	module.exports = {

		LoadUsers : load,
		FindUser : findUser,
		UserExists : userExists,
		AddUser : addUser
	};

}());