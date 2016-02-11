var port = 3001;
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var userStore ={
    mimi: {hashedPassword:"827ccb0eea8a706c4c34a16891f84e7b",
           email:"kdfieir@gmail.com"}
           





};


app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: false}));







app.get("/", function(req, res){
   
    res.sendFile(path.resolve("views/register.html"));
});

app.get("login", function(req, res){
    res.sendFile(path.resole("views/login.html"));

    


})



//app.get("/whatsmyname/:nameArg", function(req,res){
        //res.end("Your name is "+req.params.nameArg);
    
app.post("/", function(req,res){ 
    if (!req.body.username || !req.body.password){
        res.end("Username and password both required");
        return;
    
    
    
    }
   
    
    
    var userNameInRequest = req.body.usersname;
    usersStore[userNameInRequest] = {hashedPassword: hash,
                                     email: req.body.email};
    res.end('Thanks for registering' + userNameInRequest);
    console.log(JSON.stringify(userStore));
});

app.post("/login", function(req, res){
    
    if(!req.body.username || !req.body.password){
        res.end("Username and password required");
        return;
    
    
    }
    
    if(!userStore[req.body.username]){
        res.end("That user doesn't exist yet. Please register.");
        return;
    }
     var hash = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest('hex');
    
    if(userStore[req.body.username].hashedPassword != hash){
        res.end("Your password was wrong");
        return;
    
    
    
    
    }
    res.end("Congratulations, you're logged in");
    console.log("User "+ req.body.username+ "logged in");
    
    



});





app.listen(port);
console.log("Server listening at port" +port);
console.log("Current user store is :");
console.log(JSON.stringify(userStore));








