<template>
  <div>
    <v-container v-if="!success">
      <v-layout>
        <v-flex class="mb-1">
          <div class="headline font-weight-medium">
            Create a new password.
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex class="mb-4">
          <div class="body">
            Enter your new password below.
          </div>
        </v-flex>
      </v-layout>
        <v-layout v-model="valid">
          <v-flex>
            <v-text-field single-line outline placeholder="New Password" v-model="password"
              :rules="[rules.required, rules.min]" :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout v-model="valid" >
          <v-flex>
            <v-text-field single-line outline placeholder="New Password" v-model="passwordTwo"
              :rules="[rules.checkPasswords, rules.min]" :append-icon="showPasswordTwo ? 'visibility' : 'visibility_off'"
              :type="showPasswordTwo ? 'text' : 'password'" @click:append="showPasswordTwo = !showPasswordTwo"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <v-btn @click="changePassword" :disabled="!valid" block color="info" depressed>Change Password</v-btn>
          </v-flex>
        </v-layout>
      
    </v-container>

    <v-container v-if="success">
      <v-form v-model="valid">
        <v-layout>
          <v-flex class="mb-3 mt-5">
            <div class="headline font-weight-medium">
              Success!
            </div>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="mb-4">
            <div class="body">
              Your password has been changed successfully.
            </div>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-btn @click="$router.push('/welcome/email')" block color="info" depressed>Log In</v-btn>
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
      password: '',
      passwordTwo: '',
      showPassword: false,
      showPasswordTwo:false,
      valid: true,
      success: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        checkPasswords: (password,passwordTwo) => this.password === this.passwordTwo || 'please type same password'
      }
    }

  },
  methods: {
    changePassword() {
      const token = this.$route.query.jwt

      this.$http.post('/v1/reset-password/create/new', {
          password: this.password,
          token
        })
        .then(this.successfullChangedPassword)
        .catch(this.failedChangedPassword)
    },
    successfullChangedPassword(resp) {

      if (resp.data.success === true) {
        // successfull update password at this point
        this.success = true
      } else {
        this.failedChangedPassword()
      }
    },
    failedChangedPassword(err) {
      console.log('Error updating a new password:', err)
      alert('Something went wrong and new password could not be updated. Please try again.')
    },
  }
}
</script>
