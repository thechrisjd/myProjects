<template>
  <v-container class="text-xs-center">
    <v-layout align-center justify-center fill-height row wrap>

      <v-flex xs12>
        <h1>Career2go</h1>
      </v-flex>

      <v-flex xs10>
        <v-btn @click="facebookLogin" color="primary" block depressed round :disabled="!termsAccepted">
          <v-icon left dark>fab fa-facebook-square</v-icon>
          Sign up with Facebook
        </v-btn>

        <p class="small-text mx-4 mt-2 grey--text text--darken-1">
          We will only get your name, <br>
          profile picture and email address.
        </p>
      </v-flex>


      <v-flex xs10>
        <i>– or –</i>
      </v-flex>

      <v-flex xs10>
        <v-btn to="/signup/form" color="secondary" block depressed round :disabled="!termsAccepted">
          Sign up with email
        </v-btn>
      </v-flex>

      <v-flex xs10>
        <p class="small-text grey--text text--darken-1">By signing up you agree to our <br> <router-link to="">Terms of Service</router-link>
        and <router-link to="">Privacy Policy</router-link>.
        </p>
      </v-flex>

      <v-flex xs1>
        <v-checkbox v-model="termsAccepted"></v-checkbox>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

import FacebookLogin from '../../mixins/FacebookLogin'

export default {
  mixins: [ FacebookLogin ],
  data() {
    return {
      termsAccepted: false,
    }
  }
}
</script>


<style lang="scss" scoped>

p.small-text {
  font-size: 12px !important;
}

</style>
