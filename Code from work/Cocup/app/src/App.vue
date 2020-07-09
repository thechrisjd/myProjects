<template>
  <div id="app" v-on:click='onClick'  v-bind:class='{mobile: $store.ismobile}' 
  v-touch="{
        up: () => swipeUp(),
        down: () => swipeDown()
      }"
  >
    <v-app>
      <new-coffee-dialog v-model="coffeeDialog" v-if="coffeeDialog"></new-coffee-dialog>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import NewCoffeeDialog from './components/Coffee/CoffeeNotification'
import ServerControllerMixin from './mixins/ServerController'

export default {
  mixins: [ ServerControllerMixin ],
  components: {
    NewCoffeeDialog
  },
  created() {
    const self = this

    this.checkForNewToken()
    setInterval(() => {
      self.checkForNewToken()
    }, 30 * 1000);

    // handle app versions
    const version = this.$store.state.version
    if (!version) {
      console.log('No store state found, commiting it.')
      this.$store.commit('setVersion', this.$appVersion)
    } else if (this.$appVersion === version) {
      console.log('Using lates app version.')
    } else {
      // version found in vuex is not same as new version, so update the app
      this.$store.commit('setVersion', this.$appVersion)
      console.log('Newer app version found', this.$appVersion)
      alert('A new version is available for your app.')
      window.location.reload(true)
    }

    this.resetLayoutType();
    window.onresize = () => self.resetLayoutType();
  },
  data() {
    return {
      coffeeDialog: false,
    }
  },
  methods: {
    onClick: function (event) {
      this.$root.$emit('rootclick', event);
    },
    resetLayoutType: function() {
      this.$store.ismobile = window.innerWidth < 500;
    },
    swipeUp: function() {
      document.body.classList.add('scroll-down');
    },
    swipeDown: function() {
      document.body.classList.remove('scroll-down');
    }
  }
}
</script>

<style lang="scss">

//@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,400i,500,700');
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,600,700');
@import './assets/cocup-ui.scss';

#app {
  //font-family: 'Ubuntu', 'Avenir', sans-serif;
  font-family: 'Montserrat', 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // Remove Gray Highlight When Tapping Links in Mobile Safari
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  color: #2c3e50;
  background-color: $color-gray-background;
  overflow: hidden;
}
body {
  margin: 0;
}
</style>