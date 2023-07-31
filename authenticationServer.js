const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

app.use(bodyParser.json());

var users = [];

app.post('/signup', (req, res) => {
  const userData = req.body;
  const { username, password, firstname, lastname } = userData;
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    console.log(username + "This user already exists");
    res.status(400).send("This user already exists!!!");
  } else {
    users.push(userData);
    console.log("New user has been added");
    res.status(201).send("New user added successfully!");
    console.log(users);
  }
});

app.post('/login', (req, res) => {
  const userData = req.body;
  const { username, password } = userData;
  const existingUser = users.find((user) => user.username === username && user.password === password);

  if (existingUser) {
    res.status(200).send("Login Successful!");
  } else {
    res.status(401).send("Invalid Credentials!");
  }
});

function authenticateUser(req,res,next){
  const username = req.headers.username;
  const password = req.headers.password;
  
  const user = users.find((user)=>user.username == username && user.password == password);
  if(!user){
    res.status(401).send("invalid credentials")
  }
  req.authenticateUser= user;
  next();
}


app.get('/getdata',authenticateUser, (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const user = users.find((user) => user.username === username && user.password === password);

  const userData = users.map((user)=>({
    username : user.username,
    password : user.password,
    firstname : user.firstname

  }))
  res.status(200).send(userData);
  
});

app.listen(3000, () => {
  console.log("This server is running");
});

app.use((req, res) => {
  res.status(404).send("404 not found");
});

module.exports = app;
