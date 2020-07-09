const controller = require('./controller')

// Urls need to be written with http(s), otherwise it will be shown as code with url and placeholder for hotmail receivers
const options = {firstName: 'Ana', passwordChangeUrl:'https://mail.google.com', matchedCompany: 'Lime'}
const email = 'anamnichita@gmail.com '

exports.response = controller.sendWelcomeMail(email, options)

exports.response = controller.sendForgotPasswordMail(email, options)

exports.response = controller.coffeeMatch(email, options)

