export default {
  watch: {
    'filter.type': function () {
      this.$emit('filterUpdated', this.filter)
    },
    'filter.category': function () {
      this.$emit('filterUpdated', this.filter)
    },
    'filter.jobType': function () {
      this.$emit('filterUpdated', this.filter)
    },
    'filter.showCrawledJobs': function () {
      this.$emit('filterUpdated', this.filter, true)
    }
  },
  data() {
    return {
      filter: {
        typeBool: false,
        type: [],
        categoryBool: false,
        category: '',
        jobTypeBool: false,
        jobType: '',
        locationBool: false,
        location: '',
        showCrawledJobs: false,

        typeJob: true,
        typeEvent: true,
        typeCompany: true
      }
    }
  },
  methods: {
    clearFilters() {
      this.filter.typeBool = false
      this.filter.type = ''
      this.filter.categoryBool = false
      this.filter.category = ''
      this.filter.jobTypeBool = false
      this.filter.jobType = ''
      this.filter.locationBool = false
      this.filter.location = ''
    },
  }
}