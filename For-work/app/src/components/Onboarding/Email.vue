<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="$router.push('/welcome')">
        <v-icon color="grey darken-2">arrow_back</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-form v-model="valid">
        <v-layout>
          <v-flex class="mb-1">
            <div class="headline font-weight-medium">
              What's your email?
            </div>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="mb-4">
            <div class="body">
              We need it to look up your account or create a new one.
            </div>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field single-line outline placeholder="Email" v-model="email" :rules="[rules.email]"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-btn @click="nextPage" :disabled="!valid" :loading="loading" block color="info" depressed>Next</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      loading: false,
      email: '',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Enter a valid email address.'
        }
      }
    }
  },
  methods: {
    nextPage() {
      const self = this
      this.loading = true

      this.$http.post('/v1/check-user', {
        email: this.email
      })
      .then(resp => {
        if (resp.data.success !== true) {
          return self.onFailedRequest(resp)
        }
        
        if (resp.data.payload.registered === true) {
          if (resp.data.payload.type === 'facebook') {
            // user registered via FB, send them to Welcome page to log in with FB
            alert('An account with this email address already exists. Please continue via Facebook.')
            return self.$router.push({ path: '/welcome' })
          }
          // user registered via email, send them to login
          return self.userExists()
        }
        // reroute user to create new account
        return self.newUser()
      })
      .catch(this.onFailedRequest)
      .finally(() => {
        this.loading = false
      })
    },
    userExists() {
      // route the user to the Enter Password page so they can log in
      this.$router.push({ name: 'login', params: { email: this.email } })
    },
    newUser() {
      // route the user to creating a new account
      this.$router.push({ name: 'enterName', params: { email: this.email }})
    },
    onFailedRequest(err) {
      console.log('Error checking email address for validity', err)
      alert("Ops! An error happened, please try again.")
    }
  }
}
</script>
