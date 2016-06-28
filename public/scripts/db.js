var dbConnection = require('./connection');

module.exports=
{
	emailCheck: function(data, cb){
		var sql="select isValidated from t_userdetails where emailId='"+data.email+"'";
		dbConnection(sql,cb);
	},
	login: function(data, cb){
		var sql="select * from t_userdetails where emailId='"+data.loginEmail+"' && t_password='"+data.loginPassword+"'";
		dbConnection(sql,cb);
	}
}
