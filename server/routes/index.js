var path = require('path');

var routes = function(app) {
    app.route('/')
    app.get(function (req, res) {
           res.sendFile('index.html', { root: path.join(__dirname, '../../public')});
       });
}
module.exports = routes;