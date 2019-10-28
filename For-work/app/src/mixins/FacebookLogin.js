export default {
  mounted() {

    window.checkLoginState = function (resp) {
      console.log("The user has been authenticated via the 'Login with Facebook' button", resp)
      const socialToken = resp.authResponse.accessToken
      if (socialToken) {
        return self.authenticate(socialToken)
      }
    }

    document.addEventListener('fb-sdk-loaded', function (e) {
      console.log('FB SDK has been loaded and initialized.')

      FB.getLoginStatus(function (response) {
        console.log('Facebook login status:', response.status)
        // authenticate the user with the server using the access token
        const socialToken = response.authResponse.accessToken
        if (socialToken) {
          // return self.authenticate(socialToken)
        }
        // return console.log('FB social token not found.', response)
      });
    }, false);

  },

  methods: {
    authenticate(socialToken, pictureUrl) {
      this.$http.post('/v1/auth/facebook', {
          socialToken,
          pictureUrl
        })
        .then(resp => {
          console.log('User authenticated on server via Facebook social token.', resp)
          if (resp.data.success === true) {
            this.$store.commit('setToken', resp.data.token)
            this.$store.commit('setUser', resp.data.user)

            // reroute user to the feed and indicate that it's a new user signup with email
            if (resp.data.newUser) {
              return this.$router.push({
                name: 'feed',
                params: {
                  newUser: true,
                  signupType: 'facebook'
                }
              })
            }
            return this.$router.push({
              name: 'feed',
              params: {
                isLogin: true
              }
            })
          }
        })
        .catch(err => {
          alert('An error happened and the user could not be authenticated. Please try again.')
        })
    },
    facebookLogin() {
      const self = this

      FB.login(function (response) {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information...')
        }
        const socialToken = response.authResponse.accessToken
        FB.api('/me?fields=picture.width(480).height(480),name', response => {
          // console.log('Response', response)
          // console.log('Good to see you, ', response.name)
          const picture = response.picture ? response.picture.data.url : null
          if (socialToken) {
            self.authenticate(socialToken, picture)
          }
        })
      }, {
        scope: 'email'
      })
    },
    login() {
      this.isLoading = true

      this.$http.post('/v1/login', {
          email: this.$route.params.email,
          password: this.password
        })
        .then(this.successfullLogin)
        .catch(this.failedLogin)
    },
    successfullLogin(resp) {
      this.isLoading = false

      if (resp.data.success === true) {
        // successfull login at this point
        this.$store.commit('setToken', resp.data.token)
        this.$store.commit('setUser', resp.data.user)
        this.$router.push({
          name: 'feed',
          params: {
            isLogin: true
          }
        })
      } else {
        this.failedLogin()
      }
    },
    failedLogin(err) {
      this.isLoading = false
      this.notify('Wrong username or password.')
    },
    notify(message) {
      this.snackbar.active = true
      this.snackbar.text = message
    }
  }
}