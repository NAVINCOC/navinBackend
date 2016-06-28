var mysql = require('mysql');
var connection = mysql.createPool({
      host: '192.168.1.56',
  user: 'polestarportal',
  password: 'root',
  database: 'login_test',
  connectionTimeout:60000
});

connection.on('error', function(err) {
    connection.destroy();
})
module.exports = function(options, fn) {
      connection.query(options, fn);
}