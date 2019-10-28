<template>
  <v-card>
    <v-form>
      <v-container>
        <div class="title text-md-left mt-4 mb-2">Header</div>
        <v-flex md12 class="mt-3">
          <v-textarea v-model="params.header" maxlength="300" counter label="Description" required></v-textarea>
        </v-flex>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ['campaign', 'slide', 'params'],
  created() {
    console.log('Properties to map onto fields')
    console.log(this.params)
    
  }
}
</script>
