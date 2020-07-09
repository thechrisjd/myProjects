<template>
  <v-container>
    <div class="cocup-pale-background">
      <v-toolbar color="gray" class="cocup-toolbar" fixed dense>
        <v-btn icon >
          <v-icon></v-icon>
        </v-btn>
        <v-toolbar-title class="toolbar-title-centered red--text text--darken-4">COCUP</v-toolbar-title>
        <v-btn icon to="/">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
    </div>

    <div class="info-card">
      <v-layout class="text-xs-center my-5" row wrap>
        <v-flex class="image mb-3" xs12>
          <img src="img/illustrations/undraw_confirmation_2uy0.svg" alt="">
          <p>Success</p>
        </v-flex>
        <v-flex xs12 class="mt-2">
          <p class="subheading">Enjoy your coffee</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap text-xs-center justify-center class="mt-1">
        <!-- <v-flex xs10 class="button">
          <v-btn block depressed small to="/" style="border-radius:10px">Go to Company</v-btn>
        </v-flex> -->
        <v-flex xs10 class="mb-1">
          <v-btn to="/" style="border-radius:10px">Close
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<script>


export default {
    
}
</script>

<style lang="scss" scoped>
@import '../../assets/cocup-ui.scss';
.container {
  background-image: linear-gradient(#87D8AD, #DE6C6C);

  .info-card {
    position: absolute;
    margin: 20% auto;
    margin-right: 4%;
    //margin-left: 4%;
    //background: rgba(234, 241, 241, 0.6);
    //border-color: #D3D3D3;
    border-radius: 37px;
    //border-style: solid;
    border-width: 8px;
    min-height: 70%;

    img {
      width: 80%;
    }
    p{
      color:white;
    }
  }

}

</style>


