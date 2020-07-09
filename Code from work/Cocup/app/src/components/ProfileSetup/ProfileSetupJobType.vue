<template>
  <v-container>
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-flex class="hidden-sm-and-up profile-setup-job-type"></v-flex>
    <v-layout align-center justify-center fill-height row wrap class="text-xs-center">

      <v-flex  xs12 sm12 md12 lg12>
        <div class="profile-setup-title profile-setup-job-type title">What job type you are interested in?</div>
      </v-flex>

      <v-flex xs12 sm6 md5 lg4 class="profile-setup-job-type">
        <v-btn  v-for="(item, index) in types" class="px-2 profile-setup-options" color="#7d91ad" 
          depressed
          :outline="!selectedTypes.includes(item.id)" 
          @click="toggle(item)" :key="index">
          {{ item.label }}
          <v-icon v-if="selectedTypes.includes(item.id)" 
          small right>fas fa-check</v-icon>
          
        </v-btn>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12>
        <v-btn fab color="grey" outline small class="text-xs-left" to="/profile/setup/location">
          <v-icon>fas fa-angle-left</v-icon>
        </v-btn>
        <v-btn color="success" round large :disabled="selectedTypes.length === 0" to="/profile/setup/languages">Next
        </v-btn>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { jobTypes } from '../Profile/config'
import AppToolbarDesktop from "../Core/AppToolbarDesktop"

export default {
  components: {
    AppToolbarDesktop
  },
  data() {
    return {
      types: jobTypes,
      selectedTypes: []
    }
  },
  watch: {
    selectedTypes: function (newVal) {
      this.$store.commit('setStudentInfoTags', {key: 'jobTypes', value: newVal})
    }
  },
  methods: {
    toggle(value) {
      if (!this.selectedTypes.includes(value.id)) {
        // add
        this.selectedTypes.push(value.id)
      } else {
        // remove
        this.selectedTypes = this.selectedTypes.filter(e => e !== value.id)
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../assets/cocup-ui.scss';

title.profile-setup-title{
  padding: 0 10px;
}
.theme--light.v-btn {
  color:white;
}

.container{
  margin-top: 40px;
  padding:0;
  max-width: unset;
}

.hidden-sm-and-up.profile-setup-job-type{
  margin-top: -25px;
}

.flex.profile-setup-job-type{
  padding: 0 16px;
}
</style>