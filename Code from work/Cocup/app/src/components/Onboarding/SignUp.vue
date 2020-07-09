<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="$router.push('email')">
        <v-icon color="grey darken-2">arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Sign up</v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-layout>
        <v-flex class="mb-4">
          <div class="headline font-weight-medium">
            Choose a password
          </div>
        </v-flex>
      </v-layout>

      <v-form v-model="valid">
        <v-layout>
          <v-flex>
            <v-text-field single-line outline placeholder="Password" 
            v-model="password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            hint="Minimum 8 characters"
            @click:append="showPassword = !showPassword"
            :rules="[rules.required, rules.min]"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex class="mb-4">
            <v-btn @click="signup" block color="info" depressed :disabled="!valid">Create account</v-btn>
          </v-flex>
        </v-layout>
      </v-form>

      <v-layout>
        <v-flex xs8 offset-xs2 text-xs-center>
          <p class="grey--text ">By using Cocup you agree to the <a href="#">Terms of Service</a> and <a
              href="#">Privacy Policy</a></p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    // console.log('params in signup', this.$route.params)
  },
  data() {
    return {
      password: '',
      showPassword: false,
      valid: true,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    signup() {
      this.$http.post('/v1/register', {
        type: 'student',
        firstName: this.$route.params.firstName,
        lastName: this.$route.params.lastName,
        email: this.$route.params.email,
        password: this.password,
      })
      .then(this.successfullSignup)
      .catch(this.failedSignup)
    },
    successfullSignup(resp) {
      if (resp.data.success === true) {
        // registration was successfull. Login using token in response
        this.$store.commit('setToken', resp.data.token)
        this.$store.commit('setUser', resp.data.user)
        this.$router.push({name: 'feed', params: { newUser: true, signupType: 'email' }})
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
</script>
