//script/index.js
var db= require('./db');

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

function register(req, res) {
	
	 db.emailCheck(req.body, function(err, result) {
  	 	console.log(result);
  	 	if(err)
  	 	{
			console.log("register error",err);
		}
		else
		{
			res.status(200).send(result);
		}
  	 	
  	 });
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
	}
  }
};
