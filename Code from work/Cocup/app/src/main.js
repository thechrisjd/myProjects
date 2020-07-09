import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import Axios from 'axios'
import config from './config'
import './plugins/vuetify'
import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false

// Global custom components
// ...

// Vendor components
import ImageUploader from 'vue-image-upload-resize'
Vue.use(ImageUploader);

import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

import VueConfetti from 'vue-confetti'
Vue.use(VueConfetti)

// configure backend API url based on dev/prod mode
//const apiUrl = config.apiUrl.dev
const apiUrl = process.env.NODE_ENV === 'production' ? config.apiUrl.dev : config.apiUrl.local
console.log('Using API URL', apiUrl)

Vue.prototype.$http = Axios.create({
  baseURL: apiUrl
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
