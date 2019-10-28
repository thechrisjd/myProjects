<template>
<!-- <v-container> -->
  <v-layout justify-center row wrap>
    <v-flex xs12 sm7>
      <v-select
        v-model="model.university"
        :items="config.university"
        box
        label="University"
        item-text="text" item-value="text"
      >
      </v-select>
    </v-flex>
    <v-flex xs12 sm7>
      <v-select v-model="model.studyProgress" box
        :items="['Bachelor', 'Master', 'PhD', 'Nearly Graduated', 'Recently Graduated']"
        label="Study Progression"
        ></v-select>
    </v-flex>
    <v-flex xs12 sm7>
      <v-autocomplete v-model="model.fieldOfStudy" :items="config.fieldsOfStudy" box
        label="Field of Study" cache-items flat hide-no-data hide-details item-text="name" item-value="name">
      </v-autocomplete>
    </v-flex>
  </v-layout>
  <!-- </v-container> -->
</template>

<script>

import get from 'lodash/get'
import { education } from '../config'
import debounce from 'lodash/debounce'
import UserServiceMixin from '../../../mixins/UserService'

  export default {
    mixins: [UserServiceMixin],
    data() {
      return {
        // 3. Assign value from store in data() to avoid initial watch triggering
        model: this.$store.state.studentInfo.education,
        config: education
      }
    },
    created() {
      // 1. Emit title for parent to display
      this.$emit('setTitle', 'Education')

      // 2. Set up debunce function for saving new value to store
      this.debounceSave = debounce(this.saveDataToStore, 1000)
    },
    // 4. Deep watch model for changes and trigger debounce for each change
    watch: {
      model: {
        deep: true,
        handler: function (newVal) {
          console.log(newVal);
          this.debounceSave()
        }
      }
    },
    // 5. Define how the data model should be saved in store
    methods: {
      saveDataToStore() {
        this.$store.commit('setStudentInfo', {key: 'education', value: this.model})
      },
    },
  }
</script>

<style lang="scss" scoped>
.v-autocomplete.v-input {
    max-width: unset;
}
</style>
