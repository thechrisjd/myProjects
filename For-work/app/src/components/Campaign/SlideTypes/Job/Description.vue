<template>
  <div class="slide main" :style="'background:url(' + (mainSlide.params.images.background || '') + ')' ">
    <div class="header">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="rgba(255, 255, 255, 0.8)"
          d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
      </svg>
      <div class="job-info">
        <div class="job-title">{{mainSlide.params.jobTitle}}</div>
        <div class="company-name">{{mainSlide.params.companyName}}</div>
      </div>
    </div>
    <div class="content">
      <h1 class="slide-title" v-if="slide.type === 'we-are'">We Are</h1>
      <h1 class="slide-title" v-if="slide.type === 'you-are'">You Are</h1>
      <h1 class="slide-title" v-if="slide.type === 'we-offer'">We Offer</h1>
      <h1 class="slide-title" v-if="slide.type === 'your-tasks'">Your Tasks</h1>

      <div class="slide-content" v-if="slide.params.description" v-html="slide.params.description"></div>

      <video-slide v-else-if="slide.params.videoUrl" :params="{youtubeUrl: slide.params.videoUrl}" class="video-slide">
      </video-slide>
    </div>

  </div>
</template>

<script>
import CButton from '../.././assets/C-Button'
import VideoSlide from '../Company/Video'
import _ from 'lodash'

export default {
  props: {
    campaign: {},
    slide: {},
    mainSlide: {}
  },
  components: {
    CButton,
    VideoSlide
  }
}
</script>

<style lang="scss" scoped>

@import "./job-style.scss";

.slide-content {
  height: 70%;
  overflow: scroll;
}

</style>