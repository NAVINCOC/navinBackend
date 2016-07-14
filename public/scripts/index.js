   	
var db = require('./db');
var mailer = require('./mailer');

var login = function (req, res) {
  db.login (req.body, function (err, result) {
    console.log(result);
    result= result[0];
    res.status(200).send(result);
  });
};

var emailCheck = function (req, res) {
  db.emailCheck (req.body, function (err, result) {
    console.log("check query response",result);
    console.log("result length =",result[0].length);
    result= result[0];
    if (err) {
      res.status(400).send("connection failed");
    } else if (result.length === 0) {
      res.status(200).send('NO');
    } else if (result.length > 0) {
      res.status(200).send('YES');
    }
  });
};

var forgetEmail = function (req, res) {
  db.forgetEmail (req.body, function (err, result) {
    console.log("check query response",result);
    result= result[0];
    if (err) {
      res.status(400).send("connection failed");
    } else if (result.length === 0) {
      res.status(200).send('NO');
    } else if (result.length > 0) {
      //mail Function
      var data= result[0];
      var mailOptions = {
        to: data.emailId,
        subject: "Forget Password",
        //text: "Node.js New world for me",
        html: "Hi "+data.name+",<br/>Your LogIn details are<br/>Email-ID: <strong>"+data.emailId+"</strong><br/>Password: <strong>"+data.t_password+"</strong><br/>"
      };
      mailer.mailSend (mailOptions);
      //end mail function
      res.status(200).send('YES');
    }
  });
};
var randomPassword = function () {
	var length = 8;
	var chars = "abcdefghijklmnopqrstuvwxyz!@#$ %^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
	var pass = "";
	for (var x = 0; x < length; x++) {
	var i = Math. floor(Math. random() * chars. length);
	pass += chars. charAt(i);
	}
	return pass;
}

var otpGenerator = function () {
  var otp = Math.floor(Math.random() * 900000) + 100000;
  return otp;
};

var forgetPassword = function (req, res) {
  var body = req.body;
  body.randomPassword = randomPassword ();
  db.forgetPassword (body, function (err, result) {
    console.log("check query response",result);
    result = result[0];
    if (err) {
      res.status(400).send("connection failed");
    } else {
      //mail Function
      var data= body;
      var mailOptions = {
        to: data.email,
        subject: "Forget Password",
        //text: "Node.js New world for me",
        html: "Hi,<br/>Your LogIn details are<br/>Email-ID: <strong>"+data.email+"</strong><br/>Password: <strong>"+data.randomPassword+"</strong><br/><br/>Click <a href="+'http://127.0.0.1:1823/login'+">here</a> to Login<br/><br/><strong>Thanks Regards<br />Polestar Team</strong>"
      };
      mailer.mailSend (mailOptions);
      //end mail function
      res.status(200).send('YES');
    }
  });
};

var register = function (req, res) {
  console.log("body",req.body);
  if( req.body.registerEmail !== '' && req.body.registerEmail !== undefined && req.body.registerEmail !== null && req.body.registerPassword !== '' && req.body.registerPassword !== undefined && req.body.registerPassword !== null ) {
    var body = req.body;
    body.otp = otpGenerator ();
    db.register (body, function (err, result) {
      console.log("register reponse",result);
      result= result[0];
      if (err) {
        res.status(400).send("connection failed");
      } else {
        console.log("new",result);
        db.login ( {
          loginEmail: req.body.registerEmail,
          loginPassword: req.body.registerPassword
        }, function (err, result) {
          console.log(result);
          var data = req.body;
          var mailOptions = {
            to: data.registerEmail,
            subject: "Registration Successful",
            //text: "Node.js New world for me",
            html: "Hi <strong>"+data.contactperson+"</strong>,<br/><br/>You are registered with our website.<br/><strong>Your LogIn details are - </strong><br/>Email-ID : <strong>"+data.registerEmail+"</strong><br/>Password : <strong>"+data.registerPassword+"</strong><br/><br/>Your OTP for email verification is : <strong>"+data.otp+"</strong><br />Please use this OTP to login for first time.<br /><br /><strong>Thanks Regards<br />Polestar Team</strong>"
          };
          mailer.mailSend (mailOptions);
          res.status(200).send(result);
        });
        //res.status(200).send('YES');
      }
    });
  } else {
    res.status(400).send("connection failed or invalid input");
  }
  /* console.log("register".info,req.body);
    res.status(200).send(req.body);*/
};

var verifyOtp = function (req, res) {
  console.log('verifyOtp  otp = '.debug, req.body);
  db.verifyOtp (req.body, function (err, resOtp) {
    if (err) {
      console.log(err);
      res.status(400).send('Connection Failed');
    } else {
      var mailOptions = {
        to: req.body.email,
        subject: 'Email Confirmed Successfully',
        html: 'Hello<br /><br/>Your Email is verified successfully.<br />We will notify you with with this email <strong>' + req.body.email +'</strong> for any future information<br /><br /><strong>Thanks Regards<br />Polestar Team</strong>'
      };
      mailer.mailSend (mailOptions);
      res.status(200).send('YES');
    }
  });
};

var resendOtp = function (req, res) {
  console.log('resendOtp  email '.debug, req.body);
  var newOtp = otpGenerator ();
  var body = req.body;
  body.otp = newOtp;
  db.resendOtp (body, function (err, resOtp) {
    if (err) {
      console.log(err);
      res.status(400).send('Connection Failed');
    } else {
      var mailOptions = {
        to: req.body.email,
        subject: 'OTP Request',
        html: 'Hello<br/><br/>We have received your OTP request.<br />Your new OTP is: <strong>' + newOtp +'</strong><br /><br /><strong>Thanks Regards<br />Polestar Team</strong>'
      };
      mailer.mailSend (mailOptions);
      res.status(200).send('YES');
    }
  });
}

var getQuestion = function (req, res) {
  db.getQuestion (function (err, result) {
  	result= result[0];
    if (err) {
      res.status(400).send('Connection Failed');
    } else if (result.length === 0) {
      res.status(404).send('NO DATA');
    } else if (result.length > 0) {
      res.status(200).send(result);
    }
  });
}

var review = function (req, res) {
	console.log("response:",req.body);
	console.log("qa:-",req.body.qa);
	db.saveReview (req.body, function (err, result) { console.log("review data-",result);
		if(err) {
			res.status(400).send('Connection Failed');
		}
	})
	
  /*db.saveReview (req.body, function (err, result) { console.log(result.insertId,'result');
  if (err) {
      res.status(400).send('Connection Failed');
    } else {
    	qa=req.body.qa;
    	//var i;
    	console.log('length:',qa.length);
    	var dataA = [];
    	var data = '';
    	for(var i=0; i < (qa.length); i++) {
    		var sep = '|';
			bodydata = qa[i].qId+","+qa[i].ans;
			
			if(i == 0) {
				data = bodydata;
				console.log("data1:",data);
			}
			if(i>=1)
			{
				data = data+sep+bodydata;
				console.log("data2:",data);
			}
			if(i == ((qa.length)-1)) {
				console.log("data is : ",data);
				dataA = dataA.push(" 1YES|2,NO|3,YES|5,NO");
				console.log('data3+',dataA);
			}
		}
		
    	/*for(var i=0; i < (qa.length); i++) {
    		body = { qId : qa[i].qId, ans : qa[i].ans, reviewId : result.insertId };console.log("i:",i);
			console.log("body2:",body);
	      	db.saveReviewQuesAns (body, function (err, result) { console.log(result.insertId,'result2');console.log("i",i);
	  		if (err && (i == ((qa.length)-1))) {
	     	 res.status(400).send('Connection Failed');
	   		 } else if(i == ((qa.length)-1)) {
	   		 	console.log("data send");
	      		res.status(200).send('Data successfully inserted');
	   			}	
			 });
        }*/
  /*    res.status(200).send('Data successfully inserted');
    }
  });*/
}

var getReview = function (req, res) {
  db.getReview (function (err, result) {
    if (err) {
      res.status(400).send('Connection Failed');
    } else if (result.length === 0) {
      res.status(404).send('NO DATA');
    } else if (result.length > 0) {
      res.status(200).send(result);
    }
  });
}

module.exports = {
  index: function (req,res) {
    var url = req.originalUrl.split('/');
    console.log(url);	
    if (url[2] === 'login') {
      login (req,res);
    } else if (url[2] === 'register') {
      console.log("script/index register");
      register (req,res);
    } else if (url[2] === 'emailCheck') {
      console.log("script/index emailCheck");
      emailCheck (req,res);
    } else if (url[2] === 'forgetEmail') {
      console.log("script/index forgetEMail");
      forgetPassword (req,res);
    } else if (url[2] === 'verifyOtp') {
      console.log('script/index verifyOtp');
      verifyOtp (req, res);
    } else if (url[2] === 'resendOtp') {
      console.log('script/index resendOtp');
      resendOtp (req, res);
    } else if (url[2] === 'getQuestion') {
      console.log('script/index getQuestion');
      getQuestion (req, res);
    } else if (url[2] === 'review') {
      console.log('script/index review');
      review (req, res);
    } else if (url[2] === 'getReview') {
      console.log('get review');
      getReview (req, res);
    }
  }
};
