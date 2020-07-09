<template>
  <v-card>
    <v-container class="gray-background">
      <v-layout>
        <v-flex md12>
          <v-text-field label="Header" v-model="params.header" maxlength="30" box counter required></v-text-field>
        </v-flex>
        <v-flex md12>
          <v-text-field label="Sub-header" v-model="params.subHeader" maxlength="40" box counter required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12>
          <html-editor label="Paragraph" v-model="params.paragraph" maxlength="350" box counter required></html-editor>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md6>
          <v-text-field label="Text on button" v-model="params.button.text" maxlength="35" box counter required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md12>
          <v-text-field label="Link" v-model="params.button.link" box required></v-text-field>
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

