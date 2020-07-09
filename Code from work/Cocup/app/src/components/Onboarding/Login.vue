<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="$router.push('email')">
        <v-icon color="grey darken-2">arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Log in</v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-layout>
        <v-flex class="mb-1">
          <div class="headline font-weight-medium">
            What's your password?
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex class="mb-4">
          <div class="body">
            Enter your password below to sign in to your account.
          </div>
        </v-flex>
      </v-layout>

      <v-form v-model="valid">
        <v-layout>
          <v-flex>
            <v-text-field single-line outline 
            placeholder="Password" 
            v-model="password" 
            :rules="[rules.required, rules.min]"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
        <v-flex class="mb-4">
          <div class="body">
            Forgot password? <a @click="$router.push('reset-password/reset')">Click Here</a>
          </div>
        </v-flex>
      </v-layout>

        <v-layout>
          <v-flex>
            <v-btn @click="login" :disabled="!valid" block color="info" depressed :loading="isLoading">Log in</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>

    <v-snackbar v-model="snackbar.active" multi-line>
      {{ snackbar.text }}
      <v-btn color="pink" flat @click="snackbar.active = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  created() {
    if (!this.$route.params.email) {
      console.error('Email param is missing on login page. Redirecting back to email form.')
      return this.$router.push({ name: 'email' })
    }
  },
  data() {
    return {
      password: '',
      showPassword: false,
      valid: true,
      isLoading: false,
      snackbar: {
        active: false,
        text: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
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
        this.$router.push({name: 'feed', params: { isLogin: true }})
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
</script>
