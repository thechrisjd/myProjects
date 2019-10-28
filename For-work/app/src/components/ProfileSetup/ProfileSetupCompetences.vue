<template>
  <v-container>
    <v-layout align-center justify-center fill-height row wrap class="text-xs-center">

      <v-flex xs11 md6>
        <div class="title mb-5">What competences do you have?</div>
        <v-text-field id="searchInput" v-model="searchInput" solo clearable label="Type here" type="text">
        </v-text-field>

        <v-card class="text-xs-left" id="results-card" v-if="searchResults">
          <v-chip v-for="(chip, index) in searchResults" :key="index" small @click="addCompetence(chip)">{{ chip }}
          </v-chip>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-chip v-for="(chip, index) in selectedItems" :key="index" small close @input="removeCompetence(chip)">{{ chip }}</v-chip>
      </v-flex>

      <!-- BOTTOM ELEMENTS -->
      <v-flex xs12>
        <v-btn fab color="grey" outline small class="text-xs-left" to="/profile/setup/languages">
          <v-icon>fas fa-angle-left</v-icon>
        </v-btn>

        <v-btn color="success" round large :disabled="selectedItems.length === 0" to="/profile/setup/industries">Next</v-btn>
      </v-flex>
      <!-- BOTTOM ELEMENTS -->

    </v-layout>
  </v-container>
</template>

<script>

import { skills } from '../Settings/config'

export default {
  data() {
    return {
      searchInput: '',
      searchResults: [],
      selectedItems: [],
    }
  },
  watch: {
    searchInput: function (newVal) {
      if (newVal && newVal.length >= 3) {
        return this.searchResults = skills.filter(e => e.toLowerCase().includes(newVal.toLowerCase()))
      }
      this.searchResults = []
    },
    selectedItems: function (newVal) {
      this.$store.commit('setStudentInfoTags', { key: 'competences', value: newVal })
    }
  },
  methods: {
    addCompetence(competence) {
      if (!this.selectedItems.includes(competence)) {
        this.selectedItems.push(competence)
      }
    },
    removeCompetence(competence) {
      if (this.selectedItems.includes(competence)) {
        this.selectedItems = this.selectedItems.filter(e => e !== competence)
      }
    }
  }
}
</script>


<style lang="scss" scoped>

#results-card {
  margin-top: -24px; 
  overflow: scroll;
  max-height: 50vh;
}

</style>
