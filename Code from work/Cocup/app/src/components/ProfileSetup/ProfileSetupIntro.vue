<template>
  <v-container class="text-xs-center">
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-layout align-center justify-center fill-height row wrap>

      <v-flex xs12>
        <h1>Career2go</h1>
      </v-flex>

      <v-flex xs12>
        <h2 class="mb-3">Hi {{ getFullName }}!</h2>
        <h3>Welcome on board!</h3>
        <div class="subheading mt-4">
          Before we can match you <br> 
          with companies and hot coffee, <br>
          we need to know a little bit about you.
        </div>
      </v-flex>

      <v-flex xs10 sm4 md4 lg3>
        <v-btn color="primary" class="mb-3" block round to="/profile/setup/location">Alright</v-btn>
        <v-btn color="secondary" outline block round to="/">Later</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import AppToolbarDesktop from "../Core/AppToolbarDesktop";

export default {
  components: {
    AppToolbarDesktop
  },
  computed: {
    getFullName() {
      try {
         return this.$store.state.user.studentInfo.profile.firstName + this.$store.state.user.studentInfo.profile.lastName
      } catch (error) {
        return 'there'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.container{
  margin-top: 40px;
  padding:0;
  max-width: unset;
}
</style>