<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="$router.push('/welcome/email')">
        <v-icon color="grey darken-2">arrow_back</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-if="!success">
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
              We need it to send a link to change your password.
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
            <v-btn @click="sendLink" :disabled="!valid" :loading="loading" block color="info" depressed>Reset Password
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
    <v-container v-if="success">
      <v-form>
        <v-layout>
          <v-flex class="mb-5 mt-5">
            <div>
              <p style="text-align:center">We sent an email to reset your password.</p>
              <p style="text-align:center">Please check your inbox.</p>
            </div>
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
      success: false,
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Enter a valid email address.'
        }
      }
    }
  },
  methods: {
    sendLink() {
      this.loading = true

      this.$http.post('/v1/reset-password/reset', {
          email: this.email
        })
        .then(resp => {
          console.log({
            resp
          })
          if (resp.data.success === true) {
            this.success = true
          }
        })
        .catch(this.onFailedRequest)
        .finally(() => {
          this.loading = false
        })
    },
    onFailedRequest(err) {
      console.log('Error checking email address for validity', err)
      alert("Ops! An error happened, please try again.")
    }
  }
}
</script>
