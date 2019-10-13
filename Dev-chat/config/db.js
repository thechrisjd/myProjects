const mongoose = require('mongoose') //mongoose is a module I used to communicate with mongodb
const config = require('config') //config is a golbal varribale and a module I downloaded
const db = config.get('mongoURI') // in the config folder I created a default.json file which contians the url to my mongo server

// connecting to the database returns a promise and so you must use async/await
const connectDB = async () => {
  //always put async/await functions into a try catch
  try {
    //using mongoose to connect the objects are options required by mongo
    await mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true  })

    //telling the terminal
    console.log('Connected to database')
  } catch (err) {
    console.error(err.message)
    //this part exits the aysnc/await function
    process.exit(1)
  }
}

module.exports = connectDB
