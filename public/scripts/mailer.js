//mailer function
var mailer = require("nodemailer");

    // Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
             user: "ashish.singla@polestarllp.com",
        	 pass: "om@@shanti"
        }
    });

module.exports = {
    mailSend: function (mail, fn) {
    	smtpTransport.sendMail(mail, fn);
   },
   mailClose: function() {
   		smtpTransport.close();
   }
}