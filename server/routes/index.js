var path = require('path');

var routes = function(app) {
    app.route('/')
        .get(function (req, res) {
           res.sendFile('index.html', { root: path.join(__dirname, '../../public')});
       });
    app.route('/chatroom')
        .post(function (req, res) {
        //    console.log(req.body);
           res.sendFile('chatroom.html', { root: path.join(__dirname, '../../public')});
       });
}
module.exports = routes;