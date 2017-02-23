var express = require('express');
var router = express.Router();
var path = require('path');

    router.get('/', function (req, res) {
      res.render('index.html');
         });
    router.get('/login', function (req, res) {
          res.render('login.html');
         });
    router.get('/register', function (req, res) {
          res.render('register.html');
         });

    router.post('/login', function (req, res) {
        console.log(req.body);
          res.sendFile('chatroom.html', { root: path.join(__dirname, '../../public')});
         });
    router.post('/register', function (req, res) {
        console.log(req.body);
          res.sendFile('user-profile.html', { root: path.join(__dirname, '../../public')});
         });

module.exports = router;
