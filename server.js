const db = require('./my_modules/sqlite3db');

const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var app = express();

//Sessions in NodeJS
//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;




app.get('/amen', function (req, res) {
  res.send('Hello World!');
});


app.get('/',(req,res) => {
  session=req.session;
  if(session.userid){
      res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else
  res.sendFile('views/index.html');
});

app.post('/user',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
      session=req.session;
      session.userid=req.body.username;
      console.log(req.session)
      res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  }
  else{
      res.send('Invalid username or password');
  }
});

app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

app.post('/usersignup', (req, res) => {
  console.log("Route user signup was called!");
  console.log(req.body);
  console.log(db);
  db.insertNewUser(req.body, ()=>{
    console.log("The user was successfully inserted!");
    res.status(200).send("Good");
  }  );
});


app.use( express.static (".") );

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});