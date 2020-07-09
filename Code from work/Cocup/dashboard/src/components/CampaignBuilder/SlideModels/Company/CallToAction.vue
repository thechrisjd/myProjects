<template>
  <v-card>
    <v-container class="gray-background">
      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Website" v-model="params.website" box required>
          </v-text-field>
          <!-- <v-select :items="items" label="Select"></v-select> -->
        </v-flex>

       </v-layout>
      <!-- <v-btn fab dark small color="primary" @click="addRow">
        <v-icon>add</v-icon>
      </v-btn> -->

      <!-- <div id="form">
        <form v-on:submit.prevent="addRow">
          <button>Add</button>
        </form>
        <ul>
          <li v-for="item in items" v-bind:key="item.phone" v-bind:title="item.email"></li>
        </ul>
      </div> -->

      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Phone number" v-model="params.telephone" box maxlength="15" counter required>
          </v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 md12>
          <v-text-field label="Email" v-model="params.email" box required></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ['params'],
  data: () => ({
    newContactText: '',
    items: [{key:1,title:'phone'},{key:1,title:'email'},{key:3, title:'website'}],
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
