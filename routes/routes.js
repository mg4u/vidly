// require express
var express = require('express');
var path    = require('path');
var UsersModel = require('../src/api/models/Users');
var UsersController = require('../src/api/controllers/Users');

// create our router object
var router = express.Router();

// route for our homepage
router.get('/', function(req, res) {
  // UsersModel.fill()
  // res.render('pages/home');
  res.send(UsersModel.list())
  // res.send(req.params)
  // res.send(req.query)
});

router.post('/register',UsersController.Insert.bind(UsersController))


// route for our about page
router.get('/about', function(req, res) {
  var users = [
    { name: 'Holly', email: 'holly@scotch.io', avatar: 'http://placekitten.com/300/300'},
    { name: 'Holly', email: 'holly@scotch.io', avatar: 'http://placekitten.com/300/300'},
    { name: 'Holly', email: 'holly@scotch.io', avatar: 'http://placekitten.com/300/300'},
    { name: 'Chris', email: 'chris@scotch.io', avatar: 'http://placekitten.com/400/400'},
    { name: 'Ado', email: 'Ado@scotch.io', avatar: 'http://placekitten.com/500/500'},
    { name: 'Samantha', email: 'Samantha@scotch.io', avatar: 'http://placekitten.com/700/700'}
  ];

  res.send({ users: users });
  // res.render('pages/about', { users: users });
});

router.get('/contact', function(req, res) {
  res.status(404).send('pages/contact');
});

router.post('/contact', function(req, res) {
  res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');
});


// export our router
module.exports = router;