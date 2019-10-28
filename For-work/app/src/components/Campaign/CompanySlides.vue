<template>
  <div>
    <div class="slide" :class="{primary: isPrimarySlide, general: !isPrimarySlide}">
      <div class="header" :style="'background:url(' + (campaign.slides[0].params.images.background || 'https://cocup-images.s3.eu-central-1.amazonaws.com/1551875507926') + ')' ">
        <div class="logo" :style="'background-color:' + campaign.slides[0].params.images.logoBackgroundColor || 'white' + ';'">
          <img :src="campaign.slides[0].params.images.logo || defaults.companyLogoUrl" alt="Logo">
        </div>
      </div>
      <h2 class="title"  v-if="slide.type==='main'" >{{ campaign.name || 'Company name' }}</h2>
      <div class="content">

        <!-- Primary slide receives all campaign to build its own slide data -->
        <primary-slide v-if="slide.type === 'main'" :campaign="campaign" :params="slide.params"></primary-slide>

        <!-- General slides receive the params only -->
        <video-slide v-else-if="slide.type === 'video'" :params="slide.params"></video-slide>
        <image-slide v-else-if="slide.type === 'image'" :params="slide.params"  :campaignId="campaign._id"></image-slide>
        <testimonial v-else-if="slide.type === 'testimonial'" :params='slide.params' :options="slide.options"></testimonial>
        <call-to-action v-else-if="slide.type === 'call-to-action'" :params='slide.params'  :campaignId="campaign._id"></call-to-action>
        <social-media v-else-if="slide.type === 'social-media'" :campaignId='campaign._id' :params='slide.params'></social-media>
        <job-positions v-else-if="slide.type === 'job-positions'" :params="slide.params" :campaignId='campaign._id'></job-positions>
        <text-slide v-else-if="slide.type === 'text'" :params="slide.params"></text-slide>
        <image-text-slide v-else-if="slide.type === 'image-text'" :params="slide.params"></image-text-slide>
        <!-- Add more slide types here... -->
        
        <slide-template v-else :type='slide.type'>Coming soon... {{ slide.type }}</slide-template>
      </div>

      <div class="stage">
        <div class="heart" :class="{ 'is-active': isFavourite }" @click="onFavouriteClicked"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimarySlide from './SlideTypes/Company/Primary'
import VideoSlide from './SlideTypes/Company/Video.vue'
import ImageSlide from './SlideTypes/Company/Images.vue'
import Testimonial from './SlideTypes/Company/Testimonial.vue'
import CallToAction from './SlideTypes/Company/CallToAction.vue'
import SocialMedia from './SlideTypes/Company/SocialMedia.vue'
import JobPositions from './SlideTypes/Company/JobPositions.vue'
import TextSlide from './SlideTypes/Company/Text.vue'
import ImageTextSlide from './SlideTypes/Company/ImageText.vue'


import SlideTemplate from './SlideTypes/Company/Template.vue'

export default {
  props: {
    campaign: {},
    slide: {},
    isPrimarySlide: {
      type: Boolean,
      default() {
        return false
      }
    },
    isFavourite: {
      type: Boolean,
      default() {
        return false
      }
    },

  },
  components: {
    PrimarySlide,
    VideoSlide,
    ImageSlide,
    Testimonial,
    CallToAction,
    SocialMedia,
    SlideTemplate,
    JobPositions,
    TextSlide,
    ImageTextSlide,
  },
  data() {
    return {
      defaults: {
        companyLogoUrl: 'https://cocup-images.s3.eu-central-1.amazonaws.com/1551875663508'
      }
    }
  },
  methods: {
    onFavouriteClicked() {
      this.$emit('update:isFavourite', !this.isFavourite)
    }
  }
}
</script>
<style lang="scss">

@import './assets/company-slides.scss';

</style>
