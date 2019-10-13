const express = require('express')
const connectDB = require('../config/db')

const app = express()

//calling the connection fuction I made in the config/db.js file
connectDB()

//init middleware. Allows us to parse body requests
app.use(express.json({ extended : false }))

//default route to check if the server is up
app.get('/', (req, res) => res.send('Hello world'))


// Defining routes
app.use('/api/users', require('./routes/api/users') )
app.use('/api/auth', require('./routes/api/auth') )
app.use('/api/profile', require('./routes/api/profile') )
app.use('/api/posts', require('./routes/api/posts') )


//Once hosted the environemnt port of the server will be chosen
//// TODO: move the localhost port to the config file
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
