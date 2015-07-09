var express = require("express");
var app = express();
var bodyParser = require('body-parser');
_ = require("underscore");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json 
app.use(bodyParser.json())

var users = [
{
	id:1,
	username:"bob",
	firstname:"Bob",
	lastname:"Jones",
	age:35
},
{
	id:2,
	username:"Joe",
	firstname:"Joseph",
	lastname:"Smith",
	age:23
}
];


//get
app.get("/users", function (req, res) {
	res.json(users);
});
//post
app.post("/users",function(req, res){
	var newUser = req.body;
	users.push(newUser);
	res.json(newUser);
});
//update
app.put("/users/:id", function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users,{id:targetId});
	//form data
	foundUser.id = req.body.id;
	foundUser.username = req.body.username;
	foundUser.firstname = req.body.firstname;
	foundUser.lastname = req.body.lastname;
	foundUser.age = req.body.age;
	res.json(foundUser);
});
//delete
app.delete("/users/:id", function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users,{id:targetId});
	if(foundUser) {
		users.splice(users.indexOf(foundUser), 1);
	}
	res.json(foundUser);
});
app.listen(3000);