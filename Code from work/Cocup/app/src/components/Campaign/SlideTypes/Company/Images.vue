<template>
  <div class="slide-general">
    <div id="one-image" v-if="params.images.length === 1 " :class="{'with-button': params.button}"
      :style="'background: url(' + (params.images[0] || 'https://cocup-images.s3.eu-central-1.amazonaws.com/1552588251546') + ');'">
    </div>

    <div id="two-image" v-else :class="{'with-button': params.button}">
      <div class="first-image"
      :style="'background: url(' + (params.images[0] || 'https://cocup-images.s3.eu-central-1.amazonaws.com/1552588251546') + ');'">
      </div>
      <div class="second-image"
      :style="'background: url(' + (params.images[1] || 'https://cocup-images.s3.eu-central-1.amazonaws.com/1552588251546') + ');'">
      </div>
    </div>

    <c-button v-if="params.button" :campaignId="campaignId" :link="params.button.link" class="link-button">
      {{ params.button.text }}</c-button>
  </div>
</template>
<style lang="scss" scoped>

.slide-general {
  margin-top: 5%;
  width: 100%;
  height: 100%;

  #one-image {
    margin-left:3px;
    width: auto;
    height: 50%;
    background-size: cover !important;

    &.with-button {
      height: 80% !important;
    }
  }
  #two-image{
    .first-image{
      float:left;
      margin-left:3px;
      width: 45%;
      height: 100%;
      background-size: cover !important;
    }

    .second-image{
      float:right;
      margin-left:3px;
      width: 45%;
      height: 100%;
      background-size: cover !important;
    }
      
      &.with-button {
      height: 80% !important;
    }
    }

  .link-button {
    margin-top: 7%;
  }
}

</style>
<script>
import CButton from '../../assets/C-Button'

export default {
  props: ['params', 'campaignId'],
  components: {
    CButton
  }
}
</script>

