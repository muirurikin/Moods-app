// set mongoDB uri
if(!process.env.MONGODB_URI) {
  require('dotenv').config();
}

//import module
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var routes = require('./server/routes');
var mongo = require('mongodb').MongoClient;
    
//Start server
io.on('connection', function() {
    console.log('Someone has Connected');
});

app.disable('x-powered-by');

//set port
app.set('port', process.env.PORT || 5000);

//mongo config
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;

//connect to db
db.on('error', console.error.bind(console, "connection error :"));
db.once('open', function() {
    console.log('Connected successfully :');
});


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
routes(app);

//start server
http.listen(app.get('port'), function() {
     console.log('Express app running on http://localhost:' + app.get('port') + ' Press CTRL-C to terminate. ');
 });
