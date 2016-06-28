//script/index.js

function login(req, res) {
  	 console.log("login"+req.body);
     res.status(200).send(req.body);
}

function register(req, res) {
    console.log("register"+req.body);
    res.status(200).send(req.body);
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
