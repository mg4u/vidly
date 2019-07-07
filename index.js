// require our dependencies
var express        = require('express');
// var expressLayouts = require('express-ejs-layouts');
// var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 3000;
// set requests as json
app.use(express.json());

// route our app
var router = require('./routes/routes');

app.use('/', router);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});