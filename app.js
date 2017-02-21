//import module
var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var mongoose = require('mongoose');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var routes = require('./server/routes');
// var mongo = require('mongodb').MongoClient;
    //Start server
io.on('connection', function() {
    console.log('Someone has Connected');
});

//create express app
var app = express();

app.disable('x-powered-by');

//set port
app.set('port', process.env.PORT || 5000);

// //mongo config
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);
// var db = mongoose.connection;

// //connect to db
// db.on('error', console.error.bind(console, "connection error :"));
// db.once('open', function() {
//     console.log('Connected successfully :');
// });


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
routes(app);

app.post("/home", function(req, res) {
    console.log(req.body);
    res.redirect(303, '/chatroom.html');
});

app.post("/process", function(req, res) {
    console.log(req.body);
    res.redirect(303, '/user-profile.html');
});
app.get('/user-profile', function(req, res) {
     var now = new Date();
     res.render('user-profile.html',{
         year: now.getFullYear(),
         month: now.getMonth() });
 });
 app.post('/user-profile/:year/:month', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, file) {
        if(err)
        return res.redirect(303, '/error.html');
        console.log('File Received');
        console.log(file);
        res.redirect(303, '/success.html');
    });
});

app.use(function(req, res) {
    res.type('text/html');
    res.status(404);
    res.redirect('/404.html');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res. redirect('/500.html');
});


//start server
app.listen(app.get('port'), function() {
     console.log('Express app running on http://localhost:' + app.get('port') + ' Press CTRL-C to terminate. ');
 });
