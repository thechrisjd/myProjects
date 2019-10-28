<template>
  <v-card>
    <v-form>
      <v-container class="gray-background">
        <div class="title text-md-left mt-4 mb-2">
          <span v-if="type === 'we-are'">We Are: </span>  
          <span v-else-if="type === 'you-are'">You Are: </span>  
          <span v-else-if="type === 'we-offer'">We Offer: </span> 
          <span v-else-if="type === 'your-tasks'">Your Tasks: </span> 
          Description
        </div>
        <v-flex md12 class="mt-3 ">
          <html-editor v-model="params.description"></html-editor>
        </v-flex>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import HtmlEditor from '../../../custom/HtmlEditor'

export default {
  props: ['type', 'params'],
  components: {
    HtmlEditor
  }
}
</script>

<style lang="scss" scoped>


</style>
