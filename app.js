var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./router');
var colors = require('colors');
 var mysql = require('mysql');

var connection = mysql.createPool({
      host: '192.168.1.56',
  user: 'polestarportal',
  password: 'root',
  database: 'ReviewSystem',
  connectionTimeout:60000
});

connection.on('error', function(err) {
    connection.destroy();
})
module.exports = function(options, fn) {
      connection.query(options, fn);
}
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

console.log('server listening at 127.0.0.1 over port 2318'.info);
app.use(cookieParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

router(app);

app.listen(2318);


