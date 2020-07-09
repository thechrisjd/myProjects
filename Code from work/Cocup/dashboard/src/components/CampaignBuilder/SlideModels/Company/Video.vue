<template>
  <v-card>
    <v-container class="gray-background">
      <v-layout row wrap>
        <v-flex xs12>
          <v-textarea v-model="params.header" label="Video Header" box maxlength="140" counter></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="YouTube Video URL" v-model="params.youtubeUrl" box required></v-text-field>
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
