export default {
  methods: {
    checkForNewToken() {
      const self = this

      this.$http.get('/v1/tokens/new')
        .then(resp => {
          const token = resp.data.payload.token
          if (token) {
            self.$store.commit('setNewCoffeeToken', token)
            self.coffeeDialog = true
          }
        })
        .catch(err => {
          console.log('error', err)
        })
    }
  },
}