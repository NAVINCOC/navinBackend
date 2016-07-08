//mailer function
var mailer = require("nodemailer");

    // Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "support@polestarllp.com",
    pass: "Polestar@123"
  }
});

module.exports = {
  mailSend: function (mail) {
    smtpTransport.sendMail(mail, function (err, nfs) {
      if(err) {
        console.log('mail error',err);
      } else {
        console.log('mail success',nfs);
      }
      smtpTransport.close ();
    });
  }
}