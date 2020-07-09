import moment from 'moment'

export default {
  methods: {
    getTimeString(dateTime) {

      const dateString = moment(dateTime).format("D MMM")

      /*if (dateType === 'CREATION') {
        return 'Posted ' + moment(dateTime).fromNow()
      } else if (dateType === 'EXPIRATION') {
        return 'Apply before ' + dateString
      }*/
      return dateString
    },
  }
}
