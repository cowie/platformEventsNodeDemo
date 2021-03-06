var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var nforce = require('nforce');
var http = require('http');
var faye = require('faye');
const {Client} = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:true
});

client.connect();


var org = nforce.createConnection({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  redirectUri: 'http://localhost:3000/oauth/_callback',
  environment: process.env.ENVIRONMENT,
  mode: 'single'
});

var oauth;

org.authenticate({username: process.env.SFDCUSERNAME, password: process.env.SFDCPASSWORD}, function(err, resp){
  if (!err) {
      console.log('sfdc auth successful');
      var fClient = new faye.Client(org.oauth.instance_url + '/cometd/40.0/');
      fClient.setHeader('Authorization', 'OAuth ' + org.oauth.access_token);
      fClient.subscribe('/event/' + process.env.EVENTNAME, function(message){
          //do stuff
        console.log('we GOT ONE: ' + message);
        console.log('payload:');
        console.log(message.payload);
        
        switch(message.payload.Type__c){
          case 'Account':
            client.query('INSERT INTO "public"."sfdcAccount"("sfdcID", "name") VALUES($1, $2) RETURNING "id"', [message.payload.ObjectRecordID__c, message.payload.Name__c], (err,res)=>{
              if(err) console.error(err);
              
              
            });
          
          case 'Contact':
            client.query('INSERT INTO "public"."sfdcContact"(sfdcID, name) VALUES($1, $2) RETURNING id', [message.payload.ObjectRecordID__c, message.payload.Name__c], (err,res)=>{
              if(err) console.error(err);
              });
            break;
          default:

          
        }


        

      });
  }
  
  
  else {console.log('wrong password?');console.log(err);}
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
