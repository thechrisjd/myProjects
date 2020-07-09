<template>
  <v-container>
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-flex class="hidden-sm-and-up profile-setup-location"></v-flex>
    <v-layout align-center justify-center fill-height row wrap class="text-xs-center">
      <v-flex xs12 sm12 md12 lg12> 
        <div class="profile-setup-title title">Where would you like to work?</div>
      </v-flex>

      <v-flex xs12 sm6 md5 lg4 class="profile-setup-location">
        <v-btn v-for="(location, index) in locationNames" class="px-2 profile-setup-options" color="#7d91ad"
          depressed 
          :outline="!selectedLocations.includes(location.id)" 
          @click="toggle(location)" :key="index">
          {{ location.label }}
          <v-icon v-if="selectedLocations.includes(location.id)" 
          small right>fas fa-check</v-icon>
        </v-btn>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12>
        <v-btn fab color="grey" outline small class="text-xs-left" to="/profile/setup">
          <v-icon color="#7d91ad">fas fa-angle-left</v-icon>
        </v-btn>

        <v-btn color="success" round large :disabled="selectedLocations.length === 0" to="/profile/setup/type">Next</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppToolbarDesktop from "../Core/AppToolbarDesktop";

export default {
   components: {
    AppToolbarDesktop
  },
  data() {
    return {
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
      selectedLocations: []
    }
  },
  watch: {
    selectedLocations: function (newVal) {
      this.$store.commit('setStudentInfoTags', {key: 'locations', value: newVal} )
    }
  },
  methods: {
    toggle(location) {
      if (!this.selectedLocations.includes(location.id)) {
        // add
        this.selectedLocations.push(location.id)
      } else {
        // remove
        this.selectedLocations = this.selectedLocations.filter(e => e !== location.id)
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

.hidden-sm-and-up.profile-setup-location{
  margin-top: -25px;
}

.flex.profile-setup-location{
  padding: 0 16px;
}
</style>
