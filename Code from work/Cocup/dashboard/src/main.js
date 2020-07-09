import Vue from "vue"
import './plugins/vuetify'
import App from "./App"
import router from './router'
import axios from 'axios';
import store from './store';

const getApiUrl = () => {
  const stage = ''
  const dev = '//localhost:3000'

  return process.env.NODE_ENV === 'production' ? stage : dev
  // return stage
}

// eslint-disable-next-line
console.log('Using API url', getApiUrl())

// configure axios
Vue.prototype.$http = axios.create({
  baseURL: getApiUrl()
});

import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

import ImageUpload from './components/custom/ImageUpload.vue'
Vue.component('image-upload', ImageUpload)

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
