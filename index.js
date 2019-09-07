// require our dependencies
var express        = require('express');
var app            = express();
var port           = process.env.PORT || 3000;

// set requests as json
app.use(express.json());

// DB app
const Sequelize = require('sequelize');
const { DB_PATH } = require('./src/api/configs/Config');
console.log('DB_PATH',DB_PATH)
const sequelize = new Sequelize(DB_PATH);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// route our app
var router = require('./routes/routes');

app.use('/', router);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});