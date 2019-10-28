<template>
<v-card>
    <v-form>
      <v-container class="gray-background">
    <div class="title text-md-left mt-4 mb-2">Event Information</div>
        <v-flex md12 class="mt-3">
          <html-editor v-model="params.header"></html-editor>
        </v-flex>
    </v-container>
    </v-form>
  </v-card>
</template>
 
<script>
import HtmlEditor from '../../../custom/HtmlEditor'

export default {
  props: ['campaign','slide','params'],
  components: {
    HtmlEditor
  },
  watch: {
    date: function (newVal) {
      this.slide.date = new Date(newVal)
      this.$emit('update:slide', this.slide.params)    }
  },
  created() {
    console.log('Campaign', this.params)
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu2: false
    }
  }
}
</script>
