<template>
  <v-card>
    <v-container class="gray-background">
      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Link" v-model="params.link" box required>
          </v-text-field>
        </v-flex>

      </v-layout>
      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Email" v-model="params.email" box required>
          </v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Phone number" v-model="params.telephone" box maxlength="15" counter required>
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ['slide','params'],
  data: () => ({
    newContactText: '',
    items: [{key:1,title:'phone'},{key:2,title:'email'},{key:3, title:'website'}],
    nextId: 4
  }),
  methods: {
    addRow: function () {
      this.items.push({
        id: this.nextId++,
        title: this.newContactText
      })
      this.newContactText = ''
    },
  }
}
</script>
