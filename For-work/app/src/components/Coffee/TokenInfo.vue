<template>
  <v-container>
    <!-- <div class="cocup-pale-background">
      <v-toolbar color="gray" class="cocup-toolbar" fixed dense>
        <v-btn icon>
          <v-icon></v-icon>
        </v-btn>
        <v-toolbar-title class="toolbar-title-centered red--text text--darken-4">COCUP</v-toolbar-title>
        <v-btn icon to="/">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
    </div> -->
      <v-layout class="text-xs-center" justify-center row wrap v-if="token">

        <v-btn class="hidden-sm-and-up arrow-back" icon @click="$router.push('/coffee')"  >
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-flex class="mt-4" xs12>
            <img :src="token.description.logo" alt="avatar">
        </v-flex>

        <!-- Text from company -->
        <v-flex xs10 sm12 class="white--text mb-2">
          <div class="title mt-5 mb-3"> Dear {{$store.state.user.studentInfo.profile.firstName}}, </div>
          <div class="caption mb-3" v-if="token.description.ctaData && token.description.ctaData.text" v-html="token.description.ctaData.text"></div>
          <div class="caption mb-3" v-else>Congratulations! Here is a cup of coffee for you because we value your skills and competences! Feel free to check out our website while enjoying your coffee.</div>
          <!-- <div class="caption" v-if="token.description.reasons.matchingSkills.length > 0 || token.description.reasons.matchingTraits.length > 0">Matching skills and traits</div> -->
        </v-flex>

        <!-- <v-flex xs12 class="mb-3">
          <div>
            <v-chip small color="blue lighten-1" disabled text-color="white"
              v-for="chip in token.description.reasons.matchingSkills" v-bind:key="chip.id">{{chip}}</v-chip>
          </div>
          <div>
            <v-chip small color="blue lighten-1" disabled text-color="white"
              v-for="chip in token.description.reasons.matchingTraits" v-bind:key="chip.id">{{chip}}</v-chip>
          </div>
        </v-flex> -->

        <v-flex xs12 class="website">
          <v-btn depressed :href="getHrefValue(token.description.ctaData.button)" 
            class="info-button website"
            v-if="token.description.ctaData.button.type === 'website'"
            >
            Visit website
          </v-btn>
        </v-flex>
        <v-flex xs12 class="email">
          <v-btn depressed :href="getHrefValue(token.description.ctaData.button)" 
            class="info-button email"
            v-if="token.description.ctaData.button.type === 'email'"            
            >
            <!-- {{token.description.ctaData.button.value}} -->
            Send mail
          </v-btn>
        </v-flex>
        <v-flex xs12 class="telephone" >
          <v-btn depressed :href="getHrefValue(token.description.ctaData.button)" 
          class="info-button telephone"
          v-if="token.description.ctaData.button.type === 'telephone'"
          >
            <!-- <v-icon small left 
              v-if="token.description.ctaData && token.description.ctaData.button.type === 'telephone'"
              >
                phone
              </v-icon> -->
            {{token.description.ctaData.button.value}}
          </v-btn>
        </v-flex>

        <!-- <v-flex xs12 v-if="token.isValid" class="hidden-sm-and-up">
          <v-btn color="white" class="text-xs-white" to="/coffee-match/redeem">
            <v-icon small left>redeem</v-icon>
            Redeem Coffee
          </v-btn>
        </v-flex> -->

        <v-flex class="slide-text mt-4 hidden-sm-and-up" v-if="token.isValid">
          <slider @swiped="claimCoffee(token._id)">
          </slider>
          <p class="white--text caption my-2">Let the coffee shop employee slide this in order to claim your coffee</p>
        </v-flex>

        <div class="white--text caption my-2">We hope you enjoy your coffee!</div>

      </v-layout>

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
      <menu-navigation></menu-navigation>
  </v-container>
</template>

<script>
import Slider from '../Utils/Slider'
import MenuNavigation from '../Core/MenuNavigation'

export default {
  components: {
    Slider,
    MenuNavigation
  },
  props: {
    tokenId: String,
  },
  data() {
    return {
      token: '',
      isLoading: false
    }
  },
  created() {
    this.loadToken(this.$route.query.tokenId || this.tokenId)
  },
  watch: {
    tokenId: function(value) {
      this.loadToken(value)
    }
  },
  methods:{
    loadToken(tokenId) {
      if (!tokenId) {
        return;
      }

      const self = this
      this.isLoading = true

      this.$http.get('/v1/tokens/' + tokenId )
      .then(resp => {
        self.token = resp.data.payload
        if (self.token.isValid) {
          self.$store.commit('setCurrentCoffeeToken', self.token)
        }
      })
      .catch(err => {
        console.log('Token info error getting token:', err)
        alert('We could not redeem this token, please try again.')
        self.$router.push('/')
      })
      .finally( () => {
        self.isLoading = false
      })
    },
    getHrefValue(button) {
      if (button.type === 'telephone') {
        return 'tel:' + button.value
      } else if (button.type === 'email') {
        return 'mailto:' + button.value
      } else if (button.type === 'website') {
        if (button.value.startsWith('http')) {
          return button.value
        }
        return '//' + button.value
      }
      return undefined
    },
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
          self.$router.push('/coffee')
        })
        .finally( () => {
          self.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../../assets/cocup-ui.scss";

.container {
  border-radius: 10px;
  background: rgba(255,89,111,1);
  background: linear-gradient(to bottom, rgba(255,89,111,1) 0%, rgba(253,124,68,1) 28%, rgba(253,124,68,1) 73%, rgba(255,89,111,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff596f', endColorstr='#ff596f', GradientType=0 );

  img{
    width: 120px;
    height: 120px;
    border: none;
    border-radius: 60px;
  }
  
  .title{
    font-size: 20px;
    color: $text-color-light;
  }

  .caption{
    font-size: 12px;
    line-height: 15px;
    color: $text-color-light;
  }

  .info-button{
    width: 96px;
    background-color: #FF6260 !important;
    color: $text-color-light;
    font-size: 9px;
    border-radius: 5px;
    padding-left: 30px;
    text-transform: none;
    box-shadow: 0px 2px 4px 1px rgb(168, 62, 60) ;

    &.website{
      background: url("../../assets/icons/globe.svg") 0px -2px no-repeat;
      background-size: 30px 53px;    
    }
    &.email{
      background: url("../../assets/icons/email.svg") 8px -2px no-repeat;
      background-size: 15px 46px;    
    }
    &.telephone{
      background: url(/img/phone.abb2e88e.svg) -3px -8px no-repeat;
      background-size: 34px 61px;
    }
  }
}

.info-card {
  position: absolute;
  margin-top: 8%;
}


@media (max-width: 500px) {
  .container{
    width: 86%;
    margin: 30px auto 80px;
    position: relative;

    .arrow-back{
      position: absolute;
      top: -35px;
      left: -35px;
      color: $text-color;
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
    
    .title{
      font-size: 16px;
    }

    .caption{
      font-size: 10px;
      line-height: 13px;
    }
    .slide-text{
      font-size: 60%;
      color: white;
    }
  }
}
</style>
