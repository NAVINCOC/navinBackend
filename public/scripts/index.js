//script/index.js
var db= require('./db');

function login(req, res) {
  	 db.emailCheck(req.body, function(err, result) {
  	 	console.log(result);
  	 	res.status(200).send(req.body);
  	 });
}

function register(req, res) {
	
	 db.emailCheck(req.body, function(err, result) {
  	 	console.log(result);
  	 	res.status(200).send(result);
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
  }
};
