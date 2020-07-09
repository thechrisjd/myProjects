const nodemailer = require("nodemailer")
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

//creating paths to html files
const welcomeTemplate2directory = path.join(__dirname, './htmlTemplates/welcomeEmail.html')
const forgotPassTemplate2directory = path.join(__dirname, './htmlTemplates/forgotPassword.html')
const coffeeMatch2directory = path.join(__dirname, './htmlTemplates/coffeeMatch.html')

// reading html files
const welcomeEmail = fs.readFileSync(welcomeTemplate2directory, {
  encoding: 'utf-8'
});
const forgotPassword = fs.readFileSync(forgotPassTemplate2directory, {
  encoding: 'utf-8'
});
const coffeeMatch = fs.readFileSync(coffeeMatch2directory, {
  encoding: 'utf-8'
});

// We used gmail as our transport service.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_SERVICE_ADDRESS, // sender email
    pass: process.env.EMAIL_SERVICE_PASSWORD // sender password
  }
})

// function to send welcome mail
exports.sendWelcomeMail = (email, options) => {
  // handlebars.compile to use html template
  const template = handlebars.compile(welcomeEmail);

  // to change info for sending personal emails.
  var options = {
    firstName: options.firstName
  };
  
  // html template will be updated acc to options
  const htmlToSend = template(options);

  // specify mail properties
  const info = {
    from: process.env.EMAIL_SERVICE_ADDRESS, // sender address
    to: email, // list of receivers
    subject: "Hello", // Subject line
    html: htmlToSend, // html body
  }

  // to send mail
  sendingMail(info)
}

// function to send forgot password mail
exports.sendForgotPasswordMail = (email, options) => {
  const template = handlebars.compile(forgotPassword);
  var options = {
    firstName: options.firstName,
    passwordChangeUrl: options.passwordChangeUrl
  };
  const htmlToSend = template(options);

  const info = {
    from: process.env.EMAIL_SERVICE_ADDRESS, // sender address
    to: email, // list of receivers
    subject: "Change Your Password", // Subject line
    html: htmlToSend, // html body
  }

  sendingMail(info)
}

// function to send coffee match mail
exports.coffeeMatch = (email, options) => {
  const template = handlebars.compile(coffeeMatch);
  var options = {
    firstName: options.firstName,
    matchedCompany: options.matchedCompany
  };
  const htmlToSend = template(options);

  const info = {
    from: process.env.EMAIL_SERVICE_ADDRESS, // sender address
    to: email, // list of receivers
    subject: "Congratulations!", // Subject line
    html: htmlToSend, // html body
  }

  sendingMail(info)
}

const sendingMail = (info) => {
  transporter.sendMail(info, function (error, info) {
    if (error) {
      console.log({
        error
      })
    } // info.response will show the success it is needed.
  })
}