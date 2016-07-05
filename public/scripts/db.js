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
		var sql="INSERT INTO t_userdetails(emailId, t_password, name, contactNo, country, state, city, pinCode, address1, address2, address3, company, conpanyType, industryType) VALUES('"+data.registerEmail+"','"+data.registerPassword+"','"+data.contactperson+"','"+data.contactno+"','"+data.country+"','"+data.state+"','"+data.city+"','"+data.pincode+"','"+data.address1+"','"+data.address2+"','"+data.address3+"','"+data.company+"','"+data.companyType+"','"+data.industryType+"')";
		dbConnection (sql, cb);
	}
}
