<template>
  <v-container>
    <v-layout align-center justify-center fill-height row wrap class="text-xs-center">

      <v-flex xs11 md7>
        <v-text-field id="searchInput" v-model="searchInput" solo clearable label="Type here" type="text">
        </v-text-field>

        <v-card class="text-xs-left mb-5" id="results-card" v-if="searchResults">
          <v-chip v-for="(chip, index) in searchResults" :key="index" small :close="selectedItems.includes(chip)"
          @click="toggleCompetence(chip)" :selected="selectedItems.includes(chip)">{{ chip }}
          </v-chip>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <div class="subheading mb-3">Your competences</div>
        <v-chip v-for="(chip, index) in selectedItems" :key="index" small close @input="removeCompetence(chip)">{{ chip }}</v-chip>
      </v-flex>

    </v-layout>
  </v-container>
</template>


<script>

import get from 'lodash/get'
import { education } from '../config'
import { skills } from '../../Settings/config'
import debounce from 'lodash/debounce'
import UserServiceMixin from '../../../mixins/UserService'

  export default {
    mixins: [UserServiceMixin],
    created() {
      // 1. Emit title for parent to display
      this.$emit('setTitle', 'Competences')

      // 2. Set up debunce function for saving new value to store
      this.debounceSave = debounce(this.saveDataToStore, 1000)
    },

    data() {
      return {
        config: education,
        searchInput: '',
        searchResults: [],
        // 3. Assign value from store in data() to avoid initial watch triggering
        selectedItems: this.$store.state.studentInfo.tags.competences || [],
      }
    },
    // 4. Deep watch model for changes and trigger debounce for each change
    watch: {
      selectedItems: {
        deep: true,
        handler: function (newVal) {
          this.debounceSave()
        }
      },
      searchInput: function (newVal) {
        if (newVal && newVal.length >= 3) {
          return this.searchResults = skills.filter(e => e.toLowerCase().includes(newVal.toLowerCase()))
        }
        this.searchResults = []
      },
    },
    methods: {
      // 5. Define how the data model should be saved in store
      saveDataToStore() {
        this.$store.commit('setStudentInfo', {key: 'tags.competences', value: this.selectedItems})
      },
      toggleCompetence(competence) {
        if (!this.selectedItems.includes(competence)) {
          this.selectedItems.unshift(competence)
        } else {
          // remove it
          this.removeCompetence(competence)
        }
      },
      removeCompetence(competence) {
        if (this.selectedItems.includes(competence)) {
          this.selectedItems = this.selectedItems.filter(e => e !== competence)
        }
      }
    },
  }
</script>


<style lang="scss" scoped>

#results-card {
  margin-top: -24px;
  overflow: scroll;
  max-height: 50vh;
}

</style>
