import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'CocupAppUserStorage',
  storage: localStorage
})


export default [ vuexPersist.plugin ]