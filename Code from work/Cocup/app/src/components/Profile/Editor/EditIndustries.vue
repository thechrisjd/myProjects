<template>
  <v-layout align-center justify-space-around fill-height column>

    <div class="body mb-4">Select the industries that you find relevant.</div>

    <v-flex xs12 v-for="(item, index) in industries" :key="index">
      <v-btn small :outline="!isItemSelected(item)" @click="toggleItem(item)" color="primary" depressed>
        {{ item.name }}
        <v-icon v-if="isItemSelected(item)" small right>fas fa-check</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import { industries } from '../config'
import UserServiceMixin from '../../../mixins/UserService'

export default {
  mixins: [UserServiceMixin],
  created() {
    // 1. Emit title for parent to display
    this.$emit('setTitle', 'Industries')

    // 2. Set up debunce function for saving new value to store
    this.debounceSave = debounce(this.saveDataToStore, 1000)
  },

  data() {
    return {
      // 3. Assign value from store in data() to avoid initial watch triggering
      selectedIndustries: this.$store.state.studentInfo.tags.industries || [],
      industries,
    }
  },
  // 4. Deep watch model for changes and trigger debounce for each change
  watch: {
    selectedIndustries: {
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
        key: 'tags.industries',
        value: this.selectedIndustries
      })
    },
    isItemSelected(item) {
      return this.selectedIndustries.some(e => e === item.id)
    },
    toggleItem(item) {
      if (!this.selectedIndustries.some(e => e === item.id)) {
        // if the item is new
        this.selectedIndustries.push(item.id)
      } else {
        // remove
        this.selectedIndustries = this.selectedIndustries.filter(e => e !== item.id)
      }
    },
  },
}
</script>
