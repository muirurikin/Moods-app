//import module
var express = require('express');
var routes = require('./server/routes'); 

//create express app
var app = express(); 

app.disable('x-powered-by');

//set port
app.set('port', process.env.PORT || 3000); 

app.use(express.static('public'));
routes(app);


//start server
app.listen(app.get('port'), function() {
     console.log('Express app running on http://localhost:' + app.get('port') + ' Press CTRL-C to terminate. ');
 });