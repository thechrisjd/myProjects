<template>
  <v-container>
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-flex class="hidden-sm-and-up profile-setup-languages"></v-flex>
    <v-layout align-center justify-center fill-height row wrap class="text-xs-center">

      <v-flex xs12 sm12 md12 lg12> 
        <div class="profile-setup-title profile-setup-languages title">What languages do you speak?</div>
      </v-flex>
      
      <v-flex  xs12 sm6 md5 lg4 class="profile-setup-languages">
        <v-btn  v-for="(item, index) in languages" class="px-2 profile-setup-options" color="#7d91ad" 
        depressed
          :outline="!selectedLanguages.includes(item)" 
          @click="toggle(item)" :key="index" >
          {{ item }}
          <v-icon v-if="selectedLanguages.includes(item)" 
          small right>fas fa-check</v-icon>
        </v-btn>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12>
        <v-btn fab color="grey" outline small class="text-xs-left" to="/profile/setup/type">
          <v-icon>fas fa-angle-left</v-icon>
        </v-btn>

        <v-btn color="success" round large :disabled="selectedLanguages.length === 0" to="/profile/setup/industries">Next
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppToolbarDesktop from "../Core/AppToolbarDesktop"

export default {
  components: {
    AppToolbarDesktop
  },
  data() {
    return {
      languages: [
        'english', 
        'danish', 
        'norwegian', 
        'swedish',
        'finnish',
        'german'
      ],
      selectedLanguages: []
    }
  },
  watch: {
    selectedLanguages: function (newVal) {
      this.$store.commit('setStudentInfoTags', {key: 'languages', value: newVal})
    }
  },
  methods: {
    toggle(value) {
      if (!this.selectedLanguages.includes(value)) {
        // add
        this.selectedLanguages.push(value)
      } else {
        // remove
        this.selectedLanguages = this.selectedLanguages.filter(e => e !== value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/cocup-ui.scss';

.theme--light.v-btn {
  color:white;
}

.container{
  margin-top: 40px;
  padding:0;
  max-width: unset;
}

.hidden-sm-and-up.profile-setup-languages{
  margin-top: -25px;
}

.flex.profile-setup-languages{
  padding: 0 16px;
}

.title.profile-setup-languages{
  padding: 0 16px;
}
</style>
