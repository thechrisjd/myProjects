<template>
  <v-container>
    <div class="cocup-pale-background">
      <v-toolbar color="gray" class="cocup-toolbar" fixed dense>
        <v-btn icon @click="openCoffeeMatchInfo()"  >
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <v-toolbar-title class="toolbar-title-centered red--text text--darken-4">COCUP</v-toolbar-title>
        <v-btn icon @click="$router.push('/')">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
    </div>

      <div class="info-card" v-if="token.description">
        <v-layout class="text-xs-center" row wrap justify-center>
          <v-flex class="my-3" xs12>
            <v-avatar size="120" color="grey lighten-4 elevation-3">
              <img :src="token.description.logo" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs12 class="text mt-2">
            <div class="headline font-weight-bold capitalize">{{ token.description.companyName }}</div>
            <p class="subheading">offers you this cup of coffee.</p>
            <p class="subheading font-weight-bold ">Enjoy!</p>
          </v-flex>

          <v-flex xs10 class="my-3">
            <v-select dark dense v-model="selectedCoffeePlace" :items="coffeePlaces" menu-props="auto" label="Select"
              prepend-icon="map" single-line hint="Pick your coffee place" persistent-hint> </v-select>
          </v-flex>

          <v-flex class="slide-text mt-4" >
            <slider @swiped="claimCoffee(token._id)">
            </slider>
            <p>Let the coffee shop employee slide this in order to claim your coffee</p>
          </v-flex>
        </v-layout>
      </div>

      <!-- Progress indicator -->
      <div class="text-xs-center">
        <v-dialog v-model="isLoading" hide-overlay persistent width="300">
          <v-card dark>
            <v-card-text>
              <div class="text-xs-center">Loading...</div>
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>

  </v-container>
</template>

<script>
import Slider from '../Utils/Slider'

export default {
  components: {
    Slider
  },
  created() {
    this.selectedCoffeePlace = this.coffeePlaces[0]
  },
  data() {
    return {
      token: this.$store.state.coffeeTokens.current,
      selectedCoffeePlace: [],
      coffeePlaces: ['DTU Polyteknisk Forening'],
      isLoading: false,
    };
  },
  methods: {
    claimCoffee(tokenId) {
      const self = this
      this.isLoading = true

      this.$http.post('/v1/tokens/redeem', {
          tokenId
        })
        .then(resp => {
          // coffee token validated on server
          self.$router.push({
            path: '/coffee-match/success/'
          })
        })
        .catch(err => {
          alert('We could not redeem this token, please try again.')
          self.$router.push('/')
        })
        .finally( () => {
          self.isLoading = false
        })
    },
    openCoffeeMatchInfo(token) {
      this.$router.push({
        path: '/coffee-match/info/',
        query: {
          tokenId: this.token._id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-image: linear-gradient(#87D8AD, #DE6C6C);
}

.info-card {
  position: absolute;
  margin-top: 15%;
  border-radius: 37px;
  border-width: 5px;
  margin-right: 4%;
  min-height: 70%;
}
.slide-text{
  font-size: 60%;
  color: white;
}
.text{
  color: white;
}
</style>
