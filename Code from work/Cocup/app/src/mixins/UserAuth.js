export default {
  methods: {
    signup() {
      this.$http.post('/v1/register', {
        type: 'student',
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        referralCode: this.user.referralCode
      })
      .then(this.successfullSignup)
      .catch(this.failedSignup)
    },
    successfullSignup(resp) {
      if (resp.data.success === true) {
        // registration was successfull. Login using token in response
        this.$store.commit('setToken', resp.data.token)
        this.$store.commit('setUser', resp.data.user)
        this.$router.push({name: 'Feed', params: { newUser: true, signupType: 'email' }})
      } else {
        this.failedSignup()
      }
    },
    failedSignup(err) {
      console.log('Error creating a new user:', err)
      alert('Something went wrong and a new user could not be created. Please try again.')
    }
  }
}
