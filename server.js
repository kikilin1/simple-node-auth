var port = 9004;
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var mysql = require('mysql');


var connection = mysql.createConnection({
    host:'localhost',
    user:'kikilin',
    password:'',
    database:'kikilin'
    


});
connection.connect();

app.use(session({
    secret: 'qwertyuiop1234567890',
    resave: false

}));


app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: false}));







app.get("/", function(req, res){
    if(req.session.isLoggedIn)
        res.sendFile(path.resolve("passwordprotect/memberlogin.html"));
   
    res.sendFile(path.resolve("views/register.html"));
});

app.get("/login", function(req, res){
    res.sendFile(path.resolve("views/login.html"));
});
app.get("/members", function(req, res){
    res.sendFile(path.resolve("passwordprotect/memberlogin.html"));
});



//app.get("/whatsmyname/:nameArg", function(req,res){
        //res.end("Your name is "+req.params.nameArg);
    
app.post("/", function(req,res){ 
    
    if (!req.body.username || !req.body.password){
        res.end("Username and password both required");
        return;
    }

    var hash = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest('hex');
    connection.query("INSERT INTO users VALUES('"+
                    req.body.username+"', '"
                     +hash + "', '"+req.body.email+"')", function(err){
        if(err){
            res.end(JSON.stringify(err));
        }
        else{
        req.session.isLoggedIn = true; 
        res.redirect("/members");
        }
    
    });
    
    
  
});

app.post("/login", function(req, res){
    
    if (!req.body.username || !req.body.password){
        res.end("Username and password both required");
        return;
    }
    var u = req.body.username;
    var query = "SELECT * FROM users WHERE username='"+u+"'";
    connection.query(query, function(err, rows){
        if(err){
        res.end(JSON.stringify(err));
            return;
        }
        if(!rows || rows.length===0){
            res.end("No user was found with that username.");
            return;
        
        }
        else{
            var hash = crypto
            .createHash("md5")
        .update(req.body.password)
        .digest('hex');
            console.log(rows);
            if(rows[0].hashedPassword === hash){
                req.session.isLoggedIn = true;
                console.log("User "+req.body.username+" logged in");
                res.redirect("/  members");
            
            }
            else{
            res.end("wrong password!")
            }
        
        
        }
    
    
    });

});





app.listen(port);
console.log("Server listening at port" +port);









