const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET

// Validates JWT authorization token sent in header
module.exports = function (req, res, next) {
  const authorizationHeader = req.headers["authorization"]
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.unauthorized('Missing or wrongly formatted authorization token.')
  }

  // remove 'Bearer ' from token string 
  const token = authorizationHeader.slice(7)

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.unauthorized('Failed to authenticate the token.')
    }
    if (!decoded.id) {
      return res.unauthorized('Missing user ID from token.')
    }
    
    // pass on the user id and type
    req.userId = decoded.id
    req.userType = decoded.type
    req.jwt = decoded

    console.log(' * Authenticated as', decoded.type, decoded.id)

    return next()
  })
}
