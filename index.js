var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
var mainRouter = require('./routes/MainRouter');
var registrationRouter = require('./routes/RegistrationRouter');
var loginRouter = require('./routes/LoginRouter');


app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer());

app.use(mainRouter);
app.use(registrationRouter);
app.use(loginRouter);

app.get('/auth/:userId/:pwd', function(req, res) {

	var user = req.params.userId,
        pwd = req.params.pwd,
        users = {},
        msg = 'START -- ';

    fs.readFile('users.json', 'utf8', function(err, data) {

        if(err) throw err;

        users = JSON.parse(data);

        for(var i = 0; i < users.length; ++i) {

            if(users[i]._id === user && users[i].Password === pwd) {

                res.status(200).send(JSON.stringify(users[i]));
                return;
            }
        }

        res.status(404).send("No user found with id: " + user + " and password: " + pwd);
    });

});


/*
	// This function is used once to initialize the users.json file.

app.get('/init', function(req, res) {

	var users = [

                {
                    _id : "e0",
                    IsAdmin : true,
                    FullName : "Whytee D'ville",
                    Email : "elPingo@gamil.com",
                    Phone : "8019186776",
                    ImgUrl : "https://s3.amazonaws.com/uifaces/faces/twitter/dustinlamont/128.jpg",
                    Shifts : [

                        {
                            _id : "e0s0",
                            TimeIn : new Date(2015, 5, 12, 1, 30),
                            TimeOut : new Date(2015, 5, 12, 3, 30),
                            AssignedBy : "mgmt",
                            AssignedTo : "e0",
                            Status : "OK"
                        },
                        {
                            _id : "e0s1",
                            TimeIn : new Date(2015, 5, 14, 10, 30),
                            TimeOut : new Date(2015, 5, 14, 12, 0),
                            AssignedBy : "mgmt",
                            AssignedTo : "e0",
                            Status : "OK"
                        },
                        {
                            _id : "e0s2",
                            TimeIn : new Date(2015, 5, 18, 16, 20),
                            TimeOut : new Date(2015, 5, 18, 18, 30),
                            AssignedBy : "mgmt",
                            AssignedTo : "e0",
                            Status : "OK"
                        }
                    ]
                },
                {
                    _id : "e1",
                    FullName : "Slum Dogg",
                    Email : "gambino@gamil.com",
                    Phone : "8019199776",
                    ImgUrl : "https://s3.amazonaws.com/uifaces/faces/twitter/dakshbhagya/128.jpg",
                    Shifts : [

                        {
                            _id : "e1e2s0",
                            TimeIn : new Date(2015, 5, 22, 8, 30),
                            TimeOut : new Date(2015, 5, 22, 10, 30),
                            AssignedBy : "mgmt",
                            AssignedTo : "e1",
                            Status : "OK"
                        },
                        {
                            _id : "e1e2s1",
                            TimeIn : new Date(2015, 5, 24, 10, 30),
                            TimeOut : new Date(2015, 5, 24, 12, 0),
                            AssignedBy : "mgmt",
                            AssignedTo : "e1",
                            Status : "OK"
                        },
                        {
                            _id : "e1e2s2",
                            TimeIn : new Date(2015, 5, 28, 16, 20),
                            TimeOut : new Date(2015, 5, 28, 18, 30),
                            AssignedBy : "mgmt",
                            AssignedTo : "e1",
                            Status : "OK"
                        }
                    ]
                },
                {
                    _id : "e2",
                    FullName : "Maria Cobadonga",
                    Email : "megan@gamil.com",
                    Phone : "8019155776",
                    ImgUrl : "https://s3.amazonaws.com/uifaces/faces/twitter/annapickard/128.jpg",
                    Shifts : [

                        {
                            _id : "e2e2s0",
                            TimeIn : new Date(2015, 5, 2, 8, 30),
                            TimeOut : new Date(2015, 5, 2, 10, 30),
                            AssignedBy : "mgmt",
                            AssignedTo : "e1",
                            Status : "OK"
                        },
                        {
                            _id : "e2e2s1",
                            TimeIn : new Date(2015, 5, 4, 10, 30),
                            TimeOut : new Date(2015, 5, 4, 12, 0),
                            AssignedBy : "mgmt",
                            AssignedTo : "e1",
                            Status : "OK"
                        },
                        {
                            _id : "e2e2s2",
                            TimeIn : new Date(2015, 5, 8, 16, 20),
                            TimeOut : new Date(2015, 5, 8, 18, 30),
                            AssignedBy : "mgmt",
                            AssignedTo : "e1",
                            Status : "OK"
                        }
                    ]
                }
            ];

        usersJson = JSON.stringify(users);

        fs.appendFile('users.json', usersJson, function(err) {

        	if(err) throw err;

        	res.status(200).send("Users initialized");
        });

});
*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


