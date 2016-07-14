var dbConnection = require('./connection').executeQuery;

module.exports=
{
  emailCheck: function(data, cb) {
  	var query = {
			sql: 'call emailCheck(?)',
			values: [data.email]
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
    },
    login: function(data, cb){
    	var query = {
			sql: 'call login(?,?)',
			values: [data.loginEmail,data.loginPassword]
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
  },
  register: function (data, cb) {
  	var query = {
			sql: 'call register(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
			values: [data.registerEmail,data.registerPassword,data.contactperson,data.contactno,data.country,data.state,data.city,data.pincode,data.address1,data.address2,data.address3,data.company,data.companyType,data.industryType,data.otp]
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
  },
  forgetEmail: function(data, cb) {
  	var query = {
			sql: 'call forgetEmail(?)',
			values: [data.email]
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
  },
   forgetPassword: function (data, cb) {
   	var query = {
			sql: 'call forgetPassword(?,?)',
			values: [data.randomPassword,data.email]
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
   },
  getQuestion: function (cb) {
  		var query = {
			sql: 'call getQuestion(?)',
			values: [1]
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
  },
   verifyOtp: function (data, cb) {
   	var query = {
			sql: 'call verifyOtp(?,?)',
			values: [data.email,data.otp]
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
  },
  resendOtp: function (data, cb) {
  	var query = {
			sql: 'call resendOtp(?,?)',
			values: [data.otp,data.email]
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
  },
  saveReview: function (data, cb) {
  	qa=JSON.stringify(data.qa);
  	console.log("db",qa);
    var sql="INSERT INTO t_reviewData(name, email, alternateEmail, phone, alternatePhone, primarySkills, secondarySkills, expyear, expMonth) VALUES('"+data.reviewedName+"','"+data.reviewedEmail+"','"+data.reviewedAlternateEmail+"','"+data.reviewedPhone+"','"+data.reviewedAlternateNumber+"','"+data.reviewedPrimarySkills+"','"+data.reviewedSecondarySkills+"','"+data.reviewedYear+"','"+data.reviewedMonth+"')";
    dbConnection (sql, cb);
  },
  getReview: function (cb) {
  	var query = {
			sql: 'call getReview()',
			values: []
		};
		dbConnection(query, function(err, result) {
			cb(err, result);
		});
   }
}


