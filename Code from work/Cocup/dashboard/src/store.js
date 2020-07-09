import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'CocupDashboardUserStorage',
  storage: localStorage
})

export default new Vuex.Store({
  state: {
    auth: {
      token: ''
    },
    user: {},
    editor: {
      campaign: null
    },
    settings: {
      previewMode: true // tell cocup-campaign (slides preview) that it's in preview mode
    }
  },
  mutations: {
    setToken: (state, token) => {
      state.auth.token = token
      updateAxiosHeader(token)
    },
    setUser: (state, user) => {
      state.user = user
    },
    setCampaign: (state, campaignData) => {
      console.log('Setting campaign in store...')
      state.editor.campaign = campaignData
    },
    clearCampaign: (state) => {
      state.editor.campaign = null
    },
    logout: (state) => {
      state.auth.token = null
      state.user = null
      state.editor.campaign = null
    }
  },
  actions: {

  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  plugins: [vuexPersist.plugin]
})

const updateAxiosHeader = (token) => {
  // eslint-disable-next-line
  // console.log('Updated axios default authorization header in store.js')
  delete Vue.prototype.$http.defaults.headers.common['Authorization']
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
