export default {
  data: function () {
    return {
      //user: {}
    }
  },
  created() {
    //this.user = this.$store.state.user.studentInfo
  },
  watch: {
    '$store.state.studentInfo': {
      handler: function (newValue) {
        console.log('StudentInfo changes in state..')
        this.updateStudentInfoOnServer(newValue)
      },
      deep: true
    }
  },
  methods: {
    // returns updated user document

    updateStudentInfoOnServer(studentData) {
      this.$http.put('/v1/users/students', {
          studentInfo: studentData
        })
        .then(response => {
          /*if (response.data.success === true && response.data.payload) {
           this.$store.commit('setUser', response.data.payload)
         }*/

         //This is a hack fix, make a better fix in the future 
         this.$store.state.studentInfo.commit('setUser', response.data.payload)

        })
        .catch(error => {
          return console.log('error submitting updated user', error)
        })
    },

    // general on fail and on success responses
    onSuccessfullResponse() {
      console.log('Success')
    }
  }
}
