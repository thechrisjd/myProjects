import Vue from 'vue'
import set from 'lodash/set'

export default {
  setStudentInfoTags: (state, element) => {
    state.studentInfo.tags[element.key] = element.value
  },
  setStudentInfo: (state, element) => {
    console.log('StudentInfo updated in store.')
    set(state.studentInfo, element.key, element.value)
  },
  setNewCoffeeToken: (state, token) => {
    state.coffeeTokens.new = token
  },
  setCurrentCoffeeToken: (state, token) => {
    state.coffeeTokens.current = token
  },
  setTotalCoffeeTokens: (state, totalTokens) => {
    state.coffeeTokens.total = totalTokens
  },
  // Update Json Web Token
  setToken: (state, token) => {
    state.auth.token = token
    updateAxiosHeader(token)
  },
  setUser: (state, user) => {
    state.user = user
    state.studentInfo = user.studentInfo
  },
  logout: (state) => {
    state.auth.token = null
    state.user = null
    state.coffeeTokens.current = null
    state.studentInfo = null
  },
  setVersion: (state, version) => {
    state.version = version
  },
  setFavorite:(state, campaignId) => {
    console.log('mutation',campaignId)
    state.studentInfo.favorites.push(campaignId)

  },
  removeFavorite:(state, campaignId) => {
    state.studentInfo.favorites = state.studentInfo.favorites.filter(e => e !== campaignId)
  }
}

const updateAxiosHeader = (token) => {
  delete Vue.prototype.$http.defaults.headers.common['Authorization']
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}