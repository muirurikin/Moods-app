//import required modules

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./server/routes');

//create express app
var app = express();


//set port
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
routes(app);


//start server
app.listen(port, function() {
     console.log('Express app running on http://localhost:'+ port );
 });
