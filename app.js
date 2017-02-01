//import required modules

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./server/routes');

//create express app
var app = express();


//set port
var port = process.env.PORT || 3000;

// use global Promise to bypass deprecation errors
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;

// notify the user when there is a connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to db');
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
routes(app);


//start server
app.listen(port, function() {
     console.log('Express app running on http://localhost:'+ port );
 });
