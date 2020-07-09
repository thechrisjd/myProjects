<template>
  <v-container>
  <v-layout align-center justify-center fill-height row wrap class="text-xs-center">
    <v-flex xs12 sm7>
      <v-btn v-for="(item, index) in languages" class="px-2" color="primary" depressed
        :outline="!selectedLanguages.includes(item)" @click="toggle(item)" :key="index">
        {{ item }}
      </v-btn>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import get from 'lodash/get'
import {
  education
} from '../config'
import debounce from 'lodash/debounce'
import UserServiceMixin from '../../../mixins/UserService'

export default {
  mixins: [UserServiceMixin],
  created() {
    // 1. Emit title for parent to display
    this.$emit('setTitle', 'Languages')

    // 2. Set up debunce function for saving new value to store
    this.debounceSave = debounce(this.saveDataToStore, 1000)
  },

  data() {
    return {
      // 3. Assign value from store in data() to avoid initial watch triggering
      selectedLanguages: this.$store.state.studentInfo.tags.languages,
      languages: [
        'english',
        'danish',
        'norwegian',
        'swedish',
        'finnish',
        'german'
      ],
    }
  },
  // 4. Deep watch model for changes and trigger debounce for each change
  watch: {
    selectedLanguages: {
      deep: true,
      handler: function (newVal) {
        this.debounceSave()
      }
    }
  },
  // 5. Define how the data model should be saved in store
  methods: {
    saveDataToStore() {
      this.$store.commit('setStudentInfo', {
        key: 'tags.languages',
        value: this.selectedLanguages
      })
    },
    toggle(value) {
      if (!this.selectedLanguages.includes(value)) {
        // add
        this.selectedLanguages.push(value)
      } else {
        // remove
        this.selectedLanguages = this.selectedLanguages.filter(e => e !== value)
      }
    }
  },
}
</script>
