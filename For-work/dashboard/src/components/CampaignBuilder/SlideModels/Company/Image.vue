<template>
  <v-card>
    <v-container class="gray-background">
      <!-- <v-btn color="info" @click="params.images.push('')" :disabled="params.images.length >= 3" class="mb-5">Add image
      </v-btn> -->
      <v-layout row>
        <v-flex md12>
          <v-text-field label="Text on button" v-model="params.button.text" box maxlength="35" counter required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md12>
          <v-text-field label="Link" v-model="params.button.link" box required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12 v-if="params.text">
          <v-text-field label="Text for image" v-model="params.text"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12 v-if="params.images">
          <image-upload v-model="params.images[0]" :aspect-ratio="2/1"></image-upload>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs12 md12 v-if="params.images.length > 1">
          <image-upload v-model="params.images[1]"></image-upload>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs12 md12 v-if="params.images.length > 2">
          <image-upload v-model="params.images[2]"></image-upload>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: ['params']
}
</script>
