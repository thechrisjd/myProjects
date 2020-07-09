<template>
  <v-container>
    <v-layout justify-center row wrap>
    <v-flex xs12 sm7>
      <v-text-field box label="Linkedin Profile Url" v-model="model.linkedinProfile">
      </v-text-field>
    </v-flex>

    <v-flex xs12 sm7>
      <v-text-field box label="Portfolio Website" v-model="model.website">
      </v-text-field>
    </v-flex>

    <v-flex xs12 sm7>
      <v-text-field box label="GitHub username" v-model="model.githubUsername">
      </v-text-field>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import get from 'lodash/get'
import { education } from '../config'
import debounce from 'lodash/debounce'
import UserServiceMixin from '../../../mixins/UserService'

  export default {
    mixins: [UserServiceMixin],
    created() {
      // 1. Emit title for parent to display
      this.$emit('setTitle', 'Portfolio')

      // 2. Set up debunce function for saving new value to store
      this.debounceSave = debounce(this.saveDataToStore, 1000)

      console.log('model', this.model)
    },

    data() {
      return {
        // 3. Assign value from store in data() to avoid initial watch triggering
        model: this.$store.state.studentInfo.portfolio,
        config: education
      }
    },

    // 4. Deep watch model for changes and trigger debounce for each change
    watch: {
      model: {
        deep: true,
        handler: function (newVal) {
          this.debounceSave()
        }
      }
    },
    // 5. Define how the data model should be saved in store
    methods: {
      saveDataToStore() {
        this.$store.commit('setStudentInfo', {key: 'portfolio', value: this.model})
      },
    },
  }
</script>
