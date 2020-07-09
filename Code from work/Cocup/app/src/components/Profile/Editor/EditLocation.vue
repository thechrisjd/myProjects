<template>
  <v-container>
    <v-layout align-center justify-center fill-height row wrap class="text-xs-center">
      <v-flex xs12 sm7>
        <v-btn v-for="(location, index) in locationNames" class="px-2" color="primary"
          depressed :outline="!selectedLocations.includes(location.id)" @click="toggle(location)" :key="index">
          {{ location.label }}
          <v-icon v-if="selectedLocations.includes(location.id)" small right>fas fa-check</v-icon>
        </v-btn>
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
      this.$emit('setTitle', 'Location')

      // 2. Set up debunce function for saving new value to store
      this.debounceSave = debounce(this.saveDataToStore, 1000)
    },

    data() {
      return {
        // 3. Assign value from store in data() to avoid initial watch triggering
        selectedLocations: this.$store.state.studentInfo.tags.locations || [],
        locationNames: [
          {
            id: 'copenhagen-region',
            label: 'Copenhagen, Capital Region',
          },
          {
            id: 'zealand',
            label: 'Zealand',
          },
          {
            id: 'southern-denmark',
            label: 'Southern Denmark',
          },
          {
            id: 'central-denmark',
            label: 'Central Denmark',
          },
          {
            id: 'northern-denmark',
            label: 'Northern Denmark',
          },
          {
            id: 'funen-islands',
            label: 'Funen / Islands',
          }
        ],
      }
    },

    // 4. Deep watch model for changes and trigger debounce for each change
    watch: {
      selectedLocations: {
        deep: true,
        handler: function (newVal) {
          this.debounceSave()
        }
      }
    },
    // 5. Define how the data model should be saved in store
    methods: {
      saveDataToStore() {
        this.$store.commit('setStudentInfo', {key: 'tags.locations', value: this.selectedLocations})
      },
      toggle(location) {
        if (!this.selectedLocations.includes(location.id)) {
          // add
          this.selectedLocations.push(location.id)
        } else {
          // remove
          this.selectedLocations = this.selectedLocations.filter(e => e !== location.id)
        }
      }
    },
  }
</script>
