const request = require('request')
const mongoose = require("mongoose");
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')

/* 
authFacebook validates the access token given by facebook.

If the user exists we log them in with a JSON web token.
New users are created an account with the information given by Facebook. 
*/
exports.authFacebook = async (req, res) => {
  const socialToken = req.body.socialToken
  const pictureUrl = req.body.pictureUrl

  // send token to FB for validation
  validateWithProvider(socialToken)
    .then(async resp => {
      console.log('Successful auth with Facebook for', resp.id)
      console.log('Response', resp)

      const facebookUserId = resp.id

      const user = await User.findOne({
        facebookId: facebookUserId
      })

      if (user) {
        // user is registered - generate them a login token
        const token = generateJWT(user)
        return res.json({
          success: true,
          token,
          user
        })

      } else {
        // create new user in database
        const newUser = await User.create({
          type: 'student',
          facebookId: facebookUserId,
          email: resp.email,
          studentInfo: {
            profile: {
              firstName: resp.first_name,
              lastName: resp.last_name,
              dateOfBirth: new Date(resp.birthday),
              profilePicture: pictureUrl
            },
            tags: {}
          }
        })

        // send login token for this user
        const token = generateJWT(newUser)
        return res.json({
          success: true,
          message: 'Created a new user.',
          newUser: true,
          user: newUser,
          token
        })
      }
    })
    .catch(error => {
      console.log('Failed to auth with Facebook', error)
      return res.preconditionFailed(error)
    })
}

const generateJWT = user => {
  if (!user._id) {
    throw Error('Missing user id when creating JWT.')
  }
  const jwtSecret = process.env.JWT_SECRET
  const token = jwt.sign({
    id: user._id,
    type: user.type,
    email: user.email,
    roles: user.roles,
  }, jwtSecret, {
    expiresIn: '30 days'
  });

  return token
}


function validateWithProvider(socialToken) {
  return new Promise(function (resolve, reject) {
    // Send a GET request to Facebook with the token as query string
    request({
        url: 'https://graph.facebook.com/v3.2/me',
        qs: {
          access_token: socialToken,
          fields: 'id,name,first_name,last_name,email,birthday,gender'
        }
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          console.log('Response', response)
          reject(error);
        }
      }
    );
  });
}