<template>
  <v-dialog v-model="value" persistent max-width="320">
    <v-card>
      <v-card-title class="headline">Help us help you 🙏</v-card-title>
      <v-card-text>
        <div v-if="!ui.feedbackSubmitted">
          <p>At Cocup, we love feedback! <br> So let's trade!</p>
          <p>Every time we get a useful feedback we give you a cup of coffee to show our appreciation.</p>
          <v-textarea label="Type your feedback here..." box v-model="feedbackText"></v-textarea>
        </div>
        <div v-else>
          <div class="subheading green--text darken-3 font-weight-medium">Success!</div>
          <p>We have received your feedback, <br> thank you!</p>
          <p>An employee will evaluate your feedback and follow up with a steaming hot coffee within a few days.</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click="closeFeedbackDialog">Close</v-btn>
        <v-btn color="green darken-1" flat @click="submitFeedback" v-show="!ui.feedbackSubmitted"
          :disabled="!feedbackText">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  props: ['value'],

  data() {
    return {
      feedbackText: '',
      ui: {
        feedbackSubmitted: false,
      },
    }
  },

  methods: {
    submitFeedback() {
      this.ui.feedbackSubmitted = false

      this.$http.post('/v1/feedback', {
          feedbackText: this.feedbackText
        })
        .then(success => {
          this.ui.feedbackSubmitted = true
          this.feedbackText = ''
        })
        .catch(error => {
          alert('Sorrry, we could not process your feedback. Please try again.')
        })
    },

    closeFeedbackDialog() {
      this.$emit('input', false)
      this.ui.feedbackSubmitted = false
      this.feedbackText = ''
    },
  }
}
</script>
