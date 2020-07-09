var mongoose = require('mongoose')
require('../token/model.js')
const Vendor = mongoose.model('Token')
var _ = require('lodash')
var ObjectId = require('mongoose').Types.ObjectId

exports.findAll = (req, res) => {
  Vendor.find({seen : "true"}, {"_id": 0, updatedAt: 1})
  .then(tokens => {
    const coffeeTokens = {}
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    coffeeTokens.total = tokens.length
    coffeeTokens.redemThisMonth = 0
    coffeeTokens.month = []
    coffeeTokens.jan = 0
    coffeeTokens.feb = 0
    coffeeTokens.mar = 0
    coffeeTokens.apr = 0
    coffeeTokens.may = 0
    coffeeTokens.jun = 0
    coffeeTokens.jul = 0
    coffeeTokens.aug = 0
    coffeeTokens.sep = 0
    coffeeTokens.oct = 0
    coffeeTokens.nov = 0
    coffeeTokens.dec = 0
    tokens.forEach(function (arrayItem) {
        const redemAt = arrayItem.updatedAt
        const redemedDate = new Date(redemAt)
        const redemedMonth = redemedDate.getMonth() + 1
        if (currentMonth === redemedMonth) {
          coffeeTokens.redemThisMonth = coffeeTokens.redemThisMonth + 1
          return coffeeTokens
        } else if ( 1 === redemedMonth) {
            coffeeTokens.jan = coffeeTokens.jan + 1
        } else if ( 2 === redemedMonth) {
            coffeeTokens.feb = coffeeTokens.feb + 1
        } else if ( 3 === redemedMonth) {
            coffeeTokens.mar = coffeeTokens.mar + 1
        } else if ( 4 === redemedMonth) {
            coffeeTokens.apr = coffeeTokens.apr + 1
        } else if ( 5 === redemedMonth) {
            coffeeTokens.may = coffeeTokens.may + 1
        } else if ( 6 === redemedMonth) {
            coffeeTokens.jun = coffeeTokens.jun + 1
        } else if ( 7 === redemedMonth) {
            coffeeTokens.jul = coffeeTokens.jul + 1
        } else if ( 8 === redemedMonth) {
            coffeeTokens.aug = coffeeTokens.aug + 1
        } else if ( 9 === redemedMonth) {
              coffeeTokens.sep = coffeeTokens.sep + 1
        } else if ( 10 === redemedMonth) {
            coffeeTokens.oct = coffeeTokens.oct + 1
        } else if ( 11 === redemedMonth) {
            coffeeTokens.nov = coffeeTokens.nov + 1
        } else if ( 12 === redemedMonth) {
            coffeeTokens.dec = coffeeTokens.dec + 1
        }
        return arrayItem
      })
      coffeeTokens.month.push(coffeeTokens.jan);
      coffeeTokens.month.push(coffeeTokens.feb);
      coffeeTokens.month.push(coffeeTokens.mar);
      coffeeTokens.month.push(coffeeTokens.apr);
      coffeeTokens.month.push(coffeeTokens.may);
      coffeeTokens.month.push(coffeeTokens.jun);
      coffeeTokens.month.push(coffeeTokens.jul);
      coffeeTokens.month.push(coffeeTokens.aug);
      coffeeTokens.month.push(coffeeTokens.sep);
      coffeeTokens.month.push(coffeeTokens.oct);
      coffeeTokens.month.push(coffeeTokens.nov);
      coffeeTokens.month.push(coffeeTokens.dec);
    res.json(coffeeTokens);
  }).catch(err => {
      res.sendStatus(500).send({
          message: err.message || "Something wrong while retrieving products."
      });
  });

}
