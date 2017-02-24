// Load environment variables
if(!process.env.MONGODB_URI) {
  require('dotenv').config();
}

//import module
var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var formidable = require('formidable');
var bodyParser = require('body-parser');
// var routes = require('./server/routes');

var routes = require('./server/routes/index');
var users = require('./server/routes/users');

//Start server
io.on('connection', function() {
    console.log('Someone has Connected');
});

app.disable('x-powered-by');

// serve the routes
app.use('/', routes);
app.use('/users', users);

//set port
app.set('port', process.env.PORT || 5000);

//mongo config
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;


//connect to db
db.on('error', console.error.bind(console, "connection error :"));
db.once('open', function() {
    console.log('Connected successfully to the db');
});

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// set view engine
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// serve static files
app.use(express.static('public'));

//start server
http.listen(app.get('port'), function() {
     console.log('Express app running on http://localhost:' + app.get('port') + ' Press CTRL-C to terminate. ');
 });
