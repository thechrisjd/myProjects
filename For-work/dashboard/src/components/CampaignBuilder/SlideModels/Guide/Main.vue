<template>
  <v-card>
    <v-form>
      <v-container>
        <div class="title text-md-left mt-4 mb-2">Information</div>
        <v-flex md12 class="mt-3">
          <v-text-field v-model="campaign.name" maxlength="40" counter label="Name of the campaign (Not shown publicly)" required></v-text-field>
        </v-flex>
        <v-flex md12 class="mt-3">
          <v-text-field v-model="slide.params.textTop" maxlength="40" counter label="Title" required></v-text-field>
        </v-flex>
        <v-flex md12 class="mt-3">
          <v-text-field v-model="slide.params.textBottom" maxlength="55" counter label="Company Name" required></v-text-field>
        </v-flex>
        <v-flex md12 class="mt-3">
          <v-text-field v-model="slide.params.text" maxlength="100" counter label="Quotation" required></v-text-field>
        </v-flex>

        <div class="title text-md-left mt-4 mb-2">Header</div>
        <v-flex md12 class="mt-3">
          <v-text-field v-model="slide.params.header" maxlength="60" counter label="Short description" required></v-text-field>
        </v-flex>

        <div class="title text-md-left mt-4 mb-2">Images</div>
        <v-layout row wrap>
          <v-flex xs12 md12>
            <image-upload align="left" v-model="slide.params.images.logo" label="Event Logo" required></image-upload>
          </v-flex>
          <v-flex xs12 md12>
            <image-upload align="left" v-model="slide.params.images.background" label="Background Image" required></image-upload>
          </v-flex>
        </v-layout>

        <div class="title text-md-left mt-4 mb-2">Action button</div>
        <v-layout>
          <v-flex xs12 md4>
            <v-text-field v-model="slide.params.button.text" maxlength="16" counter label="Text on button" required></v-text-field>
          </v-flex>
          <v-flex xs12 md8>
            <v-text-field v-model="slide.params.button.link" label="Link" required></v-text-field>
          </v-flex>
        </v-layout>

      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ['campaign', 'slide'],
  created() {
    console.log('Properties to map onto fields')
    console.log(this.slide.params)
  }
}
</script>
