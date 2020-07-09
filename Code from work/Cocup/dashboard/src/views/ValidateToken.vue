<template>

    <v-app id="VToken"> 
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs7 offset-(xs5 | md2 lg5)>
            <v-card light>
              <v-card-title primary class="title" > 

              </v-card-title>
              <div  v-if="valid === true">  
                <v-img id="image_" :src="img1"></v-img>
                <v-card-text id="sub_"> <b> Token Is Valid</b> </v-card-text>
              </div>
              <div v-else>
                <v-img id="image_" :src="img2">
                </v-img>
                <v-card-text id="sub_" > <b> Token Is Not Valid </b></v-card-text>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
 </v-app>


</template>

<script>
import img1 from '../assets/greenCheck.png'
import img2 from '../assets/redCross.png'
  export default {
    data: () => ({
      drawer: null,
      valid:true,
      img1,
      img2
    }),
    props: {
      source: String
    },
    methods: {
      
    },
    created() {
      var tokenId = this.$route.params.id
      this.$http.get('/v1/tokens/validate/'+tokenId)
      .then((response) => {
          if (response.data.success === true) {
            this.valid = true
        } else {
            this.valid = false
          }
        })
        .catch(function (error) {
          alert("Sorry We Couldn't Authorize Your Token" + error)    
          console.log(error)
        });
    }
  }
</script>

<style lang="scss" scoped>

 #image_ {
   margin: 10px;
 }

 #sub_ {
   text-align: center;
 }
</style>