<template>
  <v-container>
    <v-layout justify-center row wrap>
    <v-flex xs12 sm7>
      <v-text-field label="About me" box v-model="profile.about"></v-text-field>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>

//import get from 'lodash/get'
import debounce from 'lodash/debounce'
import UserServiceMixin from '../../../mixins/UserService'

  export default {
    mixins: [UserServiceMixin],
    created() {
      // 1. Emit title for parent to display
      this.$emit('setTitle', 'About me')

      // 2. Set up debunce function for saving new value to store
      this.debounceSave = debounce(this.saveDataToStore, 1000)
    },

    data() {
      return {
        // 3. Assign value from store in data() to avoid initial watch triggering
          profile: this.$store.state.studentInfo.profile
        }
    },
    // 4. Deep watch model for changes and trigger debounce for each change
    watch: {
      profile: {
        deep: true,
        handler: function () {
          this.debounceSave()
        }
      }
    },
    // 5. Define how the data model should be saved in store
    methods: {
      saveDataToStore() {
        this.$store.commit('setStudentInfo', {key: 'profile', value: this.profile})
      },
    },
  }
</script>
