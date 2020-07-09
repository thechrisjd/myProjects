<template>
  <v-card>
    <v-container class="gray-background">
      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Facebook Account URL" box v-model="params.facebook" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Instagram Account URL" box v-model="params.instagram" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Twitter Account URL" box v-model="params.twitter" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="LinkedIn Account URL" box v-model="params.linkedin" required></v-text-field>
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
