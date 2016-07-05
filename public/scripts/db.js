var dbConnection = require('./connection');

module.exports=
{
	emailCheck: function(data, cb){
		var sql="select isValidated from t_userdetails where emailId='"+data.email+"'";
		dbConnection(sql,cb);
	},
	login: function(data, cb){
		var sql="select * from t_userdetails where emailId='"+data.loginEmail+"' && t_password='"+data.loginPassword+"'";
		dbConnection (sql, cb);
	},
	register: function (data, cb){
		var sql="INSERT INTO t_userdetails(firstName,lastName,contactNo,emailId,address,t_password) VALUES('dummy','dummy',"+data.contactno+",'"+data.emailR+"','"+data.address1+"','"+data.passwordR+"')";
		dbConnection (sql, cb);
	}
}
