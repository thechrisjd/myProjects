<template>
  <v-container fluid class="text-xs-center">
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-flex class="hidden-xs-only welcome"></v-flex>
    <v-layout align-center justify-center fill-height row column>
      <v-flex xs10 md5 class="my-5">
        <img src="../../assets/logo/POS_Logomark.svg" alt="logo" class="logo-sign" />
        <v-flex xs12 md12 class="mt-3 mb-3">
          <img
            src="../../assets/logo/CareerToGoLogotype_pos_080819.svg"
            alt="logo-slogan"
            class="logo-slogan"
          />
        </v-flex>
        <div>Discover jobs.</div>
        <div>Match with companies.</div>
        <div>Get free coffee.</div>
      </v-flex>

      <v-flex xs7>
        <v-btn color="success" round block class="mt-1" to="/form">Sign up</v-btn>
        <v-btn color="success" round block outline to="/login">I already have an account</v-btn>
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
}
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

.container{
  margin-top: 50px;
  padding:0;
}

.hidden-xs-only.welcome{
  margin-bottom: 80px;
}

.test {
  background-color: #eeeeee;
}
.Cocup-logo {
  width: 20px;
  float: left;
  margin: 14px;
  margin-top: 20px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li:last-child {
  border-right: none;
}

li a {
  display: block;
  color: #231f20;
  text-align: center;
  padding: 19px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: rgb(228, 218, 218);
}

.active {
  background-color: #4caf50;
}
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 40%;
    margin-bottom: 2rem;
  }
}
</style>