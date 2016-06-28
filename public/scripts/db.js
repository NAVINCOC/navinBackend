var dbConnection = require('./connection');

module.exports=
{
	emailCheck: function(data, cb){
		var sql="select * from t_userdetails where emailId='"+data.email+"'";
		dbConnection(sql,cb);
	}
}
