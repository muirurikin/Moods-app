var express          =  require('express');
var app              =  express();
var http             =  require('http').Server(app);
var io               =  require('socket.io')(http);
var flash            =  require('connect-flash');
var session          =  require('express-session');
var cookieParser     =  require('cookie-parser');
var expressValidator =  require('express-validator');
var passport         =  require('passport');
var morgan           =  require('morgan');
var mongoose         =  require('mongoose');
var formidable       =  require('formidable');
var bodyParser       =  require('body-parser');
var routes           =  require('./server/routes/index');

// Load environment variables
if(!process.env.MONGODB_URI) {
  require('dotenv').config();
}

//set port
app.set('port', process.env.PORT || 5000);

//mongo config
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
console.log(process.env.MONGODB_URI);
require('./server/config/passport.js')(passport);

//connect to db
db.on('error', console.error.bind(console, "connection error :"));
db.once('open', function() {
  console.log('Connected successfully to the db');
});

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
// use cookieParser
app.use(cookieParser());

// set view engine
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// set static folder
app.use(express.static('public'));
//Start server
io.on('connection', function() {
  console.log('Someone has Connected');
});

app.disable('x-powered-by');

// express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root    = namespace.shift(),
      formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect flash
app.use(flash());

// define flash messages - Global variables
app.use(function(req, res, next){
  res.locals.success_msg =  req.flash('success_msg');
  res.locals.error_msg   =  req.flash('error_msg');
  res.locals.error       =  req.flash('error');
  res.locals.user        =  req.user || null;
  next();
});

// serve the routes
app.use(morgan('dev'));
app.use(routes);

//start server
http.listen(app.get('port'), function() {
  console.log('Express app running on http://localhost:' + app.get('port') + ' Press CTRL-C to terminate. ');
});
