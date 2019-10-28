var AWS = require('aws-sdk');
var request = require('request');

AWS.config.update({
  region: 'eu-central-1', // region of your bucket
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const baseUrl = 'https://cocup-images.s3.eu-central-1.amazonaws.com/'

var S3 = new AWS.S3();

module.exports.getImage = (req, res) => {

  let category = req.query.category || 'office'

  S3.listObjectsV2({
    Prefix: `stock-images/${category}/`,
    Bucket: 'cocup-images'
  }, function (err, resp) {
    if (err) {
      return res.serverError()
    }

    // remove all folders (objects where keys end with '/' )
    const listOfImages = resp.Contents.filter(obj => {
      return obj.Key.substr(-1) !== '/'
    })

    const randomIndex = getRndInteger(0, listOfImages.length)
    const imageUrl = baseUrl + listOfImages[randomIndex].Key

    res.writeHead(302, {
      "Location": imageUrl
    });
    return res.end();
  })

}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}