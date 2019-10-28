
export default {
  getUser: state => {
    return state.user
  },
  getFullName: state => {
    return state.user.studentInfo.profile.firstName + ' ' + state.user.studentInfo.profile.lastName
  },
  isAdminUser: state => {
    return state.user.roles ? state.user.roles.includes('admin') : false
  },
  getCoffeeTokens: state => {
    return {
      activeTokens: state.coffeeTokens.total.filter(token => token.isValid),
      oldTokens: state.coffeeTokens.total.filter(token => !token.isValid),
      total: state.coffeeTokens.total
    }
  },
  isProfileEmpty:(state, getters) => {
    //return getters.getProfileCompletionProgress !== 100
    return getters.getProfileCompletionProgress < 80
 
  },
  isStoreEmpty: state => {
    return state.coffeeTokens.total
  },
  getProfileCompletionProgress: state => {
    const mainKeys = ['profile', 'education', 'portfolio', 'tags']
    let totalCount = 0
    let completedCount = 0

    if (!state.studentInfo) {
      return 0;
    }
    for (let mainKey of mainKeys) {
      for (let propertyKey in state.studentInfo[mainKey]) {
        totalCount++
        if (state.studentInfo[mainKey][propertyKey]) completedCount++
      }
    }
    
    return Math.floor(100 * completedCount / totalCount)
  }
}