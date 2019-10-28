<template>
  <v-container>
    <v-layout align-start justify-center row wrap>
      <v-flex xs12 sm7>
        <v-text-field label="First name" box v-model="profile.firstName"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout align-start justify-center row wrap>
      <v-flex xs12 sm7>
        <v-text-field label="Last name" box v-model="profile.lastName"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout align-start justify-center row wrap>
      <v-flex xs12 sm7>
        <v-text-field label="Email address" disabled box v-model="email"></v-text-field>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>

import get from 'lodash/get'
import debounce from 'lodash/debounce'
import UserServiceMixin from '../../../mixins/UserService'

  export default {
    mixins: [UserServiceMixin],
    data() {
      return {
        profile: this.$store.state.studentInfo.profile,
        email: this.$store.state.user.email
      }
    },
    created() {
      this.debounceSave = debounce(this.saveDataToStore, 1000)

      this.$emit('setTitle', 'Account Details')

      //this.model = {}
      // this.model.firstName = this.$store.state.studentInfo.profile.firstName
      // this.model.lastName = this.$store.state.studentInfo.profile.lastName
      // this.model.profile = this.$store.state.studentInfo.profile;
      // this.model.email = this.$store.state.user.email
    },
    watch: {
      profile: {
        deep: true,
        handler: function (newVal) {
          this.debounceSave()
        }
      }
    },
    methods: {
      saveDataToStore() {
        // this.$store.commit('setStudentInfo', {key: 'profile.firstName', value: this.model.firstName})
        // this.$store.commit('setStudentInfo', {key: 'profile.lastName', value: this.model.lastName})

        this.$store.commit('setStudentInfo', {key: 'profile', value: this.profile})
      }
    },
  }
</script>
