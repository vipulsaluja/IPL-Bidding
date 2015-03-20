var sql = require('mssql'); 
var application_root = 'localhost/checkAPI',
    express = require("express"),
    path = require("path");
    var http=require("http");
 var nodemailer=require("nodemailer"); 
var app = express();
var server=http.createServer(app);
var bodyParser = require('body-parser');
var config = {
    user: 'sa',
    password: 'Passw0rd',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
    database: 'IPL',
    
    /*options: {
        encrypt: true // Use this if you're on Windows Azure 
    }*/
}

/*app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});*/

//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

//trying to send a email

var smtpTransport = nodemailer.createTransport({
service: "Gmail",
auth: {
user: "akkisahni07@gmail.com",
pass: "anita@1991"
},

});

var transporter=nodemailer.createTransport();







var connection=new sql.Connection(config);

//making a simple get request
app.get('/api', function (req, res) {
  //res.send('Ecomm API is running');

  connection.connect(function(err) {
    // ... error checks 
    console.dir(err);
    // Query 
    
    var request = new sql.Request();
    console.dir(request);
    request.query('select * from dbo.users', function(err, recordset) {
        // ... error checks 
 
        console.dir(recordset);
      console.log(recordset.username);
     res.send(recordset);
     connection.close();
    });
    

    
});

});
//get request ends here



app.post('/createUser', function(req, res) {
 
   var userId=req.body.name.username+Math.floor((Math.random() * 100) + 1);
   var status="pending";
   var points=1000;

   connection.connect(function(err) {
    // ... error checks 
    console.dir(err);
    // Query 
    
    var request = new sql.Request();
    console.dir(request);
    console.dir(req.body);
    request.query("insert into dbo.Users (username,password,emailId,userId,gender,status,points) values ('" + req.body.name.username + "','" + req.body.name.password + "','" + req.body.name.email + "','" + userId + "','" + req.body.name.gender + "','" + status + "','" + points + "')", function(err, recordset,fields) {
        // ... error checks 
 
        console.dir(recordset);
        res.sendStatus(200);
     //trying to send a test email
     var messageSent="please find your details  Username:"+req.body.name.username+"        Password:"+req.body.name.password+"      OTP:"+userId;
      var mailOptions={
      to : req.body.name.email,
      subject : "test email",
      text : messageSent
      }
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
      console.log(error);
      res.end("error");
      }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
      }
      });

    /*transporter.sendMail({
    from: 'akhil.sahni@hotmail.com',
    to: 'akhilsahni43@gmail.com',
    subject: 'hello',
    text: 'hello world!'
      });
*/

    });
    

    
});

 

});

//verify OTP password

app.post('/verifyUser', function(req, res) {
 
   

   connection.connect(function(err) {
    // ... error checks 
    console.dir(err);
    // Query 
    
    var request = new sql.Request();
    console.dir(request);
    console.dir(req.body);
    request.query("SELECT 1 FROM dbo.Users WHERE username="+req.body.name.username+"AND userId="+req.body.name.OTP+"", function(err, recordset,fields) {
        // ... error checks 
 
        console.dir(recordset);
        res.sendStatus(200);
    });
});
});









//making a get request with query parameter for insert query checking
app.get('/checking/:name/:paswd/:id', function (req, res) {
  //res.send('Ecomm API is running');

  connection.connect(function(err) {
    // ... error checks 
    console.dir(err);
    // Query 
    
    var request = new sql.Request();
    console.dir(request);
    request.query("insert into dbo.Users (username,password,emailId) values ('" + req.params.name + "','" + req.params.paswd + "','" + req.params.id + "')", function(err, recordset,fields) {
        // ... error checks 
 
        console.dir(recordset);
      res.send(err+recordset+fields+req.params.name+req.params.paswd+req.params.id);
     //connection.close();
    });
    

    
});

});
//end of service call with query parameters









// Launch server

app.listen(4242);
 

//making a simple sql connection

sql.connect(config, function(err) {
    // ... error checks 
    console.dir(err);
    // Query 
    
    var request = new sql.Request();
    console.dir(request);
    request.query('select * from dbo.users', function(err, recordset) {
        // ... error checks 
 
        console.dir(recordset);
    });
    
    // Stored Procedure 
    
    /*var request = new sql.Request();
    request.input('input_parameter', sql.Int, value);
    request.output('output_parameter', sql.VarChar(50));
    request.execute('procedure_name', function(err, recordsets, returnValue) {
        // ... error checks 
 
        console.dir(recordsets);
    });*/
    
}


);
//simple sql connection code ends here--successfull