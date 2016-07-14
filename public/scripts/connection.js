var mysql = require('mysql');
var config = require('./config').mysqlconfig;

var pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password : config.password,
  port : config.port,
  database: config.database,
  connectionTimeout:60000
});

pool.on('error', function(err) {
    pool.destroy();
})

module.exports = {
	executeQuery : function(query, callback) {
		if(!query) {
			var error = new Error("Query field can not left blank");
			return callback(error, null);
		}
		pool.getConnection(function(err, connection) {
		  	connection.query(query, function(err, result) {
				callback(err, result);
				connection.release();
			});
		});
	}
}