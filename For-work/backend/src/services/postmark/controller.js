// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("ade34a0b-2fd8-4469-95b9-3fdc6d7f2b35");

exports.sendWelcomeEmail = (options) => {
  client.sendEmail({
    "TemplateAlias": 'welcome-20190326131710',
    "TemplateModel": {
      "user_name": "John Smith",
      "company": {
        "name": "ACME"
      }
    },
    "From": "ep@cocup.app",
    "To": options.to,
    "Subject": "Welcome to Cocup!",
  });
}