<template>
  <div class="slide-general">
    <div class="image"
      :style="'background: url(' + (params.image || 'https://cocup-images.s3.eu-central-1.amazonaws.com/1557150169423') + ');'">
    </div>
    <div class="text" v-if="params.text" v-html="params.text"></div>
  </div>
</template>

<script>
export default {
  props: ['params', 'campaignId'],
}
</script>

<style lang="scss" scoped>

.slide-general {
  margin-top: 5%;
  width: 100%;
  height: 100%;

  .image {
    width: 100%;
    height: 60%;
    margin-bottom: 5%;
    background-size: cover !important;
  }

  .text {
    width: 100%;
    height: 40%;
    overflow: hidden;
  }
}
</style>
