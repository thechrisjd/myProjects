var mongoose = require('mongoose')
require('../user/model.js')
const Users = mongoose.model('User')
var _ = require('lodash')
var ObjectId = require('mongoose').Types.ObjectId


exports.findAll = (req, res) => {
    Users.find({type:"student"}, {"_id": 0, "createdAt": 1})
    .then(users => {
      let currentDate = new Date()
      let currentMonth = currentDate.getMonth() + 1
          var Jan = 0
          var Feb = 0
          var Mar = 0
          var Apr = 0
          var May = 0
          var Jun = 0
          var Jul = 0
          var Aug = 0
          var Sep = 0
          var Oct = 0
          var Nov = 0
          var Dec = 0
          users.forEach(function (arrayItem) {
              let signedUpTimeStamp = arrayItem.createdAt
              let signedUpDate = new Date(signedUpTimeStamp)
              let signedupMonth = signedUpDate.getMonth() + 1
              if ( 1 === signedupMonth) {
                   Jan = Jan + 1
              } else if ( 2 === signedupMonth) {
                  return Feb = Feb + 1
              } else if ( 3 === signedupMonth) {
                   return Mar = Mar + 1
              } else if ( 4 === signedupMonth) {
                  return Apr += 1
              } else if ( 5 === signedupMonth) {
                  return May += 1
              } else if ( 6 === signedupMonth) {
                  return Jun += 1
              } else if ( 7 === signedupMonth) {
                  return Jul += 1
              } else if ( 8 === signedupMonth) {
                  return Aug += 1
              } else if ( 9 === signedupMonth) {
                  return Sep += 1
              } else if ( 10 === signedupMonth) {
                  return Oct += 1
              } else if ( 11 === signedupMonth) {
                  return Nov += 1
              } else if ( 12 === signedupMonth) {
                  return Dec += 1
              }
              return arrayItem
            })
            let month = [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
            const data = {}
            data.total = users.length
            data.month = month
            data.currentMonth = month[currentMonth - 1]
            data.lastMonth = month[currentMonth - 2]
        res.send(data);
    }).catch(err => {
        res.sendStatus(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};
