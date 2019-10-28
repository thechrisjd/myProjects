<template>
  <v-card>
    <v-container class="gray-background">
      <v-layout row>
        <v-flex xs12 md12>
          <html-editor label="Text for image" v-model="params.text" counter maxlength="200"></html-editor>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12 >
          <image-upload v-model="params.image" :aspect-ratio="18/7"></image-upload>
        </v-flex>
      </v-layout>

    </v-container>
  </v-card>
</template>
<script>
import HtmlEditor from '../../../custom/HtmlEditor'

export default {
  props: ['params'],
  components: {
    HtmlEditor
  }
}
</script>