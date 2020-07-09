export default {
  data: function () {
    return {

    }
  },
  created() {
    this.loadTokensFromServer()
    console.log('[APP] TokenService created hook triggered, loading tokens..')
  },
  methods: {
    async loadTokensFromServer() {
      try {
        const response = await this.$http.get('/v1/tokens')
        const tokens = response.data.payload.tokens
        this.$store.commit('setTotalCoffeeTokens', tokens)

        return 'success'

      } catch (error) {
        return console.error('Error loading coffee tokens from server:', error)
      }
    }
  }
}
