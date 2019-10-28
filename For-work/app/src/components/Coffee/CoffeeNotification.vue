<template>
  <v-layout row justify-center>
    <v-dialog v-model="value" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">You got a coffee from <b>{{token.description.companyName}}! ☕</b></v-card-title>
        <v-card-text>
          <img src="/img/illustrations/undraw_celebration_0jvk.svg" class="notification-image" alt="Celebration">
          <div class="title" style="margin-bottom: 20px;">Congratulations,
            {{ $store.state.user.studentInfo.profile.firstName }}!</div>
          <p><b>{{token.description.companyName}}</b> has shown interest in your skills and invites you for a cup of
            coffee!</p>
          <p>Click <b>See More</b> to check out why you matched and how you can follow up with the company.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat @click="value = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="openCoffeeDialog(token)">See more</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
  props: ['value'],
  watch: {
    value: function (dialogOpen) {
      if (dialogOpen) {
        this.$confetti.start()
      } else {
        this.$confetti.stop()
      }
      this.$emit('input', this.value)
    }
  },
  created() {
    this.token = this.$store.state.coffeeTokens.new

    if (this.value) {
      this.$confetti.start()
    }
  },
  data() {
    return {
      token: null
    }
  },
  methods: {
    openCoffeeDialog(token) {
      this.$emit('input', false)
      this.$confetti.stop()
      this.$router.push({path: '/coffee-match/info/' , query: { tokenId: token._id}})
    }
  }
}
</script>

<style lang="scss" scoped>

.notification-image {
  width: 80%;
  position: relative;
  left: 10%;
  margin-bottom: 20px;
}

</style>
