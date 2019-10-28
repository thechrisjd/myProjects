process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  pwa: {
    name: '',
    appleMobileWebAppCapable: 'yes',
    workboxOptions: {
      skipWaiting: true
    }
  },
  devServer: {
    https: false
  }
}
