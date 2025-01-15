var nodemailer = require("nodemailer");

// Function to send email
async function sendEmail(params, callback) {

  // Create a transporter object using SMTP details
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Gmail SMTP server
    port: 587,  // Port for TLS
    secure: false,
   
    auth: {
      user: 'minzbazar@gmail.com',  // Your Gmail address
      pass: 'nsyv mjyd mhuw saql',  // Your Gmail password (or app password)
    },
  });

  // Set up email data
  var mailOptions = {
    from: 'minzbazar@gmail.com',  // Sender email address
    to: params.email,  // Recipient email address
    subject: params.subject,  // Subject of the email
    text: params.body,  // Body of the email
  
  };

  transporter.sendMail(mailOptions,function(error,info){
    if(error){
        return callback(error);
    }else{
        return callback(null,info.response);
    }

  });

}

module.exports = {
    sendEmail
}
