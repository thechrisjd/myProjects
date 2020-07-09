<template>
  <div class="slide event">
    <div class="left-half">
     
        <!-- customize the component from here on -->
        
        <div>{{slide.params.text}}</div>
        
      
      <!-- quotation -->
      <div class="info-bottom">
        <svg style="width:34px; transform: scaleX(-1);" viewBox="0 0 24 24" class="icon">
          <path fill="rgba(255, 255, 255, 0.8)" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
        <div class="text mt-4">
          {{slide.params.text}}
        </div>
        <svg style="width:34px;" viewBox="0 0 24 24" class="icon-bottom">
          <path fill="rgba(255, 255, 255, 0.8)" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>

      </div>
    </div>
    <!-- description title -->
    <div class="right-half">
      <div class="header">
        <div class="text">
          {{ slide.params.header }}
        </div>
      </div>
      <c-button id="cto-button" :campaignId="campaign._id" :link="slide.params.button.link">{{ slide.params.button.text
        }}</c-button>
    </div>
    <div class="logo" :style="'background:url(' + (slide.params.images.logo || 'https://cocup-images.s3.eu-central-1.amazonaws.com/1551875663508') + ')' "></div>
  </div>
</template>


<script>
import CButton from './assets/C-Button'

export default {

  props: {
    campaign: {},
    slide: {},
    isPrimarySlide: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  components: {
    CButton,
  },
  data() {
    return {

    }
  },
  created() {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import './assets/event-slide.scss';


</style>
