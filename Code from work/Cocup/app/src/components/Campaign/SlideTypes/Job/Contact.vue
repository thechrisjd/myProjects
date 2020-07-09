<template>
  <div class="slide main" :style="'background:url(' + (mainSlide.params.images.background || '') + ')' ">
    <div class="header">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="rgba(255, 255, 255, 0.8)"
          d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
      </svg>
      <div class="job-info">
        <div class="job-title">{{ mainSlide.params.jobTitle }}</div>
        <div class="company-name">{{ mainSlide.params.companyName }}</div>
      </div>
    </div>
    <div class="content text-xs-center">
      <h1 class="pt-2 mb-4">Contact</h1>
      <c-button v-if="params.link" class="mt-2" width="130px" :link="params.link" :campaignId='campaignId'>Visit Website</c-button>
      <c-button v-if="params.email" class="mt-2" width="130px" :email="params.email" :campaignId='campaignId'>Send Email</c-button>
      <c-button v-if="params.telephone" class="mt-2" width="130px" :telephone="params.telephone" :campaignId='campaignId'>
        {{ params.telephone }}</c-button>
    </div>
  </div>
</template>

<script>
import CButton from '../../assets/C-Button'

export default {
  props: ['params', 'mainSlide', 'campaignId'],
  components: {
    CButton
  }
}
</script>

<style lang="scss" scoped>

@import "./job-style.scss";

</style>
