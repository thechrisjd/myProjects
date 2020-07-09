<template>
  <v-card>
    <v-container class="gray-background">
      <v-layout row>
        <v-flex md12>
          <html-editor label="Quotation" v-model="params.text" maxlength="400" counter box required></html-editor>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md6>
          <v-text-field label="Author Name" v-model="params.author.name" box required></v-text-field>
        </v-flex>
        <v-flex md6>
          <v-text-field label="Author Title" v-model="params.author.title" box required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md12>
          <image-upload v-model="params.author.image" :aspect-ration="1/1" label="Author image"></image-upload>
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
