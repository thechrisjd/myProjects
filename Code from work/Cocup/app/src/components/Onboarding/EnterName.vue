<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-btn icon light @click="$router.push('email')">
        <v-icon color="grey darken-2">arrow_back</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <v-layout>
        <v-flex class="mb-1">
          <div class="headline font-weight-medium">
            What's your name?
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex class="mb-4">
          <div class="body">
            Enter your name below so companies can find you.
          </div>
        </v-flex>
      </v-layout>

      <v-form v-model="valid">
        <v-layout>
          <v-flex>
            <v-text-field single-line outline placeholder="First Name" v-model="firstName" :rules="nameRules"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field single-line outline placeholder="Last Name" v-model="lastName" :rules="nameRules"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <v-btn @click="nextPage" :disabled="!valid" block color="info" depressed>Next</v-btn>
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
      firstName: '',
      lastName: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters'
      ],
    }
  },
  methods: {
    nextPage() {
      this.$router.push({
        name: 'signup',
        params: {
          email: this.$route.params.email,
          firstName: this.firstName,
          lastName: this.lastName
        }
      })
    }
  }
}
</script>
