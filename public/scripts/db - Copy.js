var dbConnection = require('./connection').executeQuery;

module.exports=
{
  emailCheck: function(data, cb) {
    var sql="select isValidated from t_userdetails where emailId='"+data.email+"'";
    dbConnection (sql, cb);
  },
  login: function(data, cb){
    var sql="select * from t_userdetails where emailId='"+data.loginEmail+"' && t_password='"+data.loginPassword+"'";
    dbConnection (sql, cb);
  },
  register: function (data, cb) {
    var sql="INSERT INTO t_userdetails(emailId, t_password, name, contactNo, country, state, city, pinCode, address1, address2, address3, company, conpanyType, industryType, otp) VALUES('"+data.registerEmail+"','"+data.registerPassword+"','"+data.contactperson+"','"+data.contactno+"','"+data.country+"','"+data.state+"','"+data.city+"','"+data.pincode+"','"+data.address1+"','"+data.address2+"','"+data.address3+"','"+data.company+"','"+data.companyType+"','"+data.industryType+"', '"+data.otp+"')";
    dbConnection (sql, cb);
  },
  forgetEmail: function(data, cb) {
    var sql="select * from t_userdetails where emailId='"+data.email+"'";
    dbConnection (sql, cb);
  },
  forgetPassword: function (data, cb) {
  	var sql= "update t_userdetails set t_password='"+data.randomPassword+"' where emailId='"+data.email+"'";
  	dbConnection (sql, cb);
  },
  verifyOtp: function (data, cb) {
    var sql = 'update t_userdetails set isValidated=1 where emailId="'+data.email+'" && otp="'+data.otp+'"';
    dbConnection (sql, cb);
  },
  resendOtp: function (data, cb) {
    var sql = 'update t_userdetails set otp="'+data.otp+'" where emailId="'+data.email+'"';
    dbConnection (sql, cb);
  },
  getQuestion: function (cb) {
    var sql = 'select * from t_questionAnswers WHERE isActive = 1';
    dbConnection (sql, cb);
  },
  saveReview: function (data, cb) {
  	qa=JSON.stringify(data.qa);
  	console.log("db",qa);

    var sql="INSERT INTO t_reviewData(name, email, alternateEmail, phone, alternatePhone, primarySkills, secondarySkills, expyear, expMonth) VALUES('"+data.reviewedName+"','"+data.reviewedEmail+"','"+data.reviewedAlternateEmail+"','"+data.reviewedPhone+"','"+data.reviewedAlternateNumber+"','"+data.reviewedPrimarySkills+"','"+data.reviewedSecondarySkills+"','"+data.reviewedYear+"','"+data.reviewedMonth+"')";
    dbConnection (sql, cb);
  },
    saveReviewQuesAns: function (data, cb) {
    var sql="INSERT INTO t_reviewQuesAns(qId, answer, reviewId) VALUES('"+data.qId+"','"+data.ans+"','"+data.reviewId+"')";
    dbConnection (sql, cb);
  },
  getReview: function (cb) {
    var sql = 'select * from t_reviewData';
    dbConnection (sql, cb);
  }
  
}
