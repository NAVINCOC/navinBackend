var dbConnection = require('./connection');

module.exports=
{
	emailCheck: function(data, cb){
		var sql="select * from user_details";
		dbConnection(sql,cb);
	}
}
