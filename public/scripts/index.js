//script/index.js
var db = require('./db');
var mailer= require('./mailer');

function login(req, res) {
  	 db.login(req.body, function(err, result) {
  	 	console.log(result);
  	 	res.status(200).send(result);
  	 });
}

function emailCheck(req, res) {
	db.emailCheck(req.body, function(err, result) {
  	 	console.log("check query response",result);
  	 	if(err) {
			res.status(400).send("connection failed");
		} else if(result.length === 0) {
			res.status(200).send('NO');
		} else if(result.length > 0) {
			res.status(200).send('YES');
		}
  	 });
}

function forgetEmail(req, res) {
	db.forgetEmail(req.body, function(err, result) {
  	 	console.log("check query response",result);
  	 	if(err) {
			res.status(400).send("connection failed");
		} else if(result.length === 0) {
			res.status(200).send('NO');
		} else if(result.length > 0) {
			//mail Function
			
				var data= result[0];
							var mailOptions = {
										to: data.emailId,
										subject: "Registration Details",
										//text: "Node.js New world for me",
										html: "Hi "+data.name+",<br/>Your Email-ID and password are:<br/>Email-ID : "+data.emailId+"<br/>Password : "+data.t_password+"<br/>"
						
					};
					mailer.mailSend (mailOptions, function (error,res){
						if(error) {
							console.log(error);
						} else {
							console.log(res);
						}
					mailer.mailClose ();
					});
			
			//end mail function
			res.status(200).send('YES');
		}
  	 });
}

function register(req, res) {
	console.log("body",req.body);
	if(req.body.registerEmail !== "" && req.body.registerEmail!==undefined && req.body.registerEmail!==null && req.body.registerPassword!=="" && req.body.registerPassword!==undefined && req.body.registerPassword!==null)
	{
		db.register(req.body, function(err, result) {
  	 	console.log("register reponse",result);
  	 	if(err) {
			res.status(400).send("connection failed");
		} else {
			    console.log("new",result);
				db.login({loginEmail: req.body.registerEmail,loginPassword: req.body.registerPassword}, function(err, result) {
					console.log(result);
					var data= req.body;
					var mailOptions = {
										to: data.registerEmail,
										subject: "Registration Details",
										//text: "Node.js New world for me",
										html: "Hi "+data.contactperson+",<br/>You are registered with our website.<br/>Your Email-ID and password are:<br/>Email-ID : "+data.registerEmail+"<br/>Password : "+data.registerPassword+"<br/>"
						
					};
					mailer.mailSend (mailOptions, function (error,res){
						if(error) {
							console.log(error);
						} else {
							console.log(res);
						}
					mailer.mailClose ();
					});
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
}

module.exports = {
  index: function(req,res){
  	
  	var url=req.originalUrl.split('/');
    console.log(url);	
    if(url[2] === 'login') {
    	console.log("login");
		login(req,res);
	}
	else if(url[2] === 'register') {
		console.log("register");
		register(req,res);
	}
	else if(url[2] === 'emailCheck') {
		console.log("register");
		emailCheck(req,res);
	} else if(url[2] === 'forgetEmail') {
		console.log("forgetEMail");
		forgetEmail(req,res);
	}
  }
};
