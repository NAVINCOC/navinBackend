// project/app.js
var app = require('express')();
var mailer = require("nodemailer");

console.log('server listening at 127.0.0.1 over port 2318');

    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "",
            pass: ""
        }
    });

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');
app.get('/', function (req, res, next) {
 var mail = {
        from: "Yashwant Chavan <from@gmail.com>",
        to: "er.ashsingla@gmail.com",
        subject: "Send Email Using Node.js",
        text: "Node.js New world for me",
        html: "<b>Node.js New world for me</b>"
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });
});

app.listen(2318);