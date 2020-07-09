const jwt = require('jsonwebtoken')
const config = require('config')

// All middleware has access to the req and responce plus a next,
// which tells the the middleware to move onto the next middleware
module.exports = function (req, res, next) {
  // Get token from the request header
  const token = req.header('x-auth-token')

  // Check if token exists in the header
  // if the token doesn't exist return a 401 not authorized
  if (!token) {
    return res.status(401).json({ msg : "No token, authorization denied"})
  }

  // If token exists, verify the tokens authenticity i.e. if the token has expired.
  try {
    //to decode the jwt get the token and the secert
    const decoded = jwt.verify(token, config.get("jwtSecert"))

    //place the decoded user information i.e (id) into the a new req.user instance
    req.user = decoded.user

    //call next to move on ot the next middleware
    next()
  } catch (err) {
    res.status(401).json({ msg : 'Token not valid' })
  }
}
