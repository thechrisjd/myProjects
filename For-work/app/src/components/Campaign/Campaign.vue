<template>
  <div class="campaing-instance">
    <div :class="'swiper-container unselectable swiper-container-' + campaign._id"
      v-observe-visibility="visibilityChanged" :id="campaign._id">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide " v-for="(slide, key) in campaign.slides" :key="key">
          <company-slides v-if="campaign.type === 'company'" :campaign="campaign" :slide="slide"
            v-bind:isFavourite.sync='isFavourite' :isPrimarySlide="key === 0">
          </company-slides>

          <event-slides v-else-if="campaign.type === 'event'" :campaign="campaign" :slide="slide"
            :isPrimarySlide="key === 0" class="mt-4"></event-slides>

          <job-slides v-else-if="campaign.type === 'job'" :campaign="campaign" :slide="slide"
            :isPrimarySlide="key === 0" class="mt-4"></job-slides>

        </div>
      </div>
      <!-- If we need navigation buttons -->
      <div v-if="preview">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <!-- Pagination -->
      <div :class="'swiper-pagination swiper-pagination-' + campaign._id"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import 'swiper/dist/css/swiper.min.css'

import CompanySlides from './CompanySlides'
import EventSlides from './EventSlides'
import JobSlides from './JobSlides'
import { EventBus } from './eventBus.js'

export default {
  components: {
    CompanySlides,
    EventSlides,
    JobSlides
  },
  props: {
    campaign: {},
    preview: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data() {
    return {
      isFavourite: false,
      swiper: {}
    }
  },
  watch: {
    isFavourite() {
      // TODO call API here and save like
      console.log(this.campaign._id + ' is favourite ' + this.isFavourite)
    },
    campaign: {
      handler: function (newVal) {
        // console.log('campaign changed')
      },
      deep: true
    }
  },
  created() {
    if (!this.campaign) {
      console.log('Did not receive campaign data.')
    }
  },
  mounted() {
    this.initSlides()
  },
  methods: {
    initSlides() {
      const swiperContainerName = '.swiper-container-' + this.campaign._id
      const swiperPaginationName = '.swiper-pagination-' + this.campaign._id
      const container = document.getElementsByClassName('swiper-container')
      const deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      let calculatedSpaceBetween = deviceWidth > 320 ? -18 : -10
      calculatedSpaceBetween = deviceWidth > 500 ? 20 : calculatedSpaceBetween

      const self = this

      this.swiper = new Swiper(swiperContainerName, {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        spaceBetween: calculatedSpaceBetween,
        speed: 500,
        touchStartPreventDefault: false,
        observer: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: swiperPaginationName,
          clickable: true
        },
        effect: self.preview ? 'fade' : 'slide',
        on: {
          slideChange() {
            // emit slide change to parent component (used in Dashboard)
            self.$emit('slideChange', self.swiper.activeIndex)

            // emit slide change on event bus (used in App)
            EventBus.$emit('slideChange', self.swiper.activeIndex);

            // post to backend the interaction (swipe) on the campaign
            self.recordSlideInteraction()
          }
        }
      })
    },
    recordSlideInteraction() {
      if (this.$store.state.settings.previewMode === true) {
        // don't record intreractions in preview mode
        return console.log('Not recording interaction due to preview mode.')
      }
      const self = this
      const user = this.$store.state.user

      this.$http.post('/v1/interactions', {
        student: user._id,
        campaign: self.campaign._id,
        type: 'SLIDE_VIEW',
        description: {
          slideIndex: self.swiper.activeIndex
        }
      }).then(resp => {
        if (resp.data.success !== true) {
          throw Error('Could not post interaction. Expected response success true, got ' + resp.data.success)
        }
      }).catch(err => {
        throw Error('Could not post interaction. ' + err.message)
      })
    },
    recorcCampaignView(campaignId) {
      if (this.$store.state.settings.previewMode === true) {
        return console.log('Not recording interaction due to preview mode.')
      }
      const self = this
      const user = this.$store.state.user

      this.$http.post('/v1/interactions', {
        student: user._id,
        campaign: self.campaign._id,
        type: 'CAMPAIGN_VIEW',
      }).then(resp => {
        if (resp.data.success !== true) {
          throw Error('Could not post interaction. Expected response success true, got ' + resp.data.success)
        }
      }).catch(err => {
        throw Error('Could not post interaction. ' + err.message)
      })
    },
    visibilityChanged(isVisible, entry) {
      if (isVisible)
        this.recorcCampaignView()
    },
    slideTo(index = 0) {
      this.swiper.slideTo(index)
    },
    forceUpdate() {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss">

  .swiper-container-horizontal>.swiper-pagination-bullets,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 0px;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    opacity: .2;
    background:	black;
  }

  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    opacity: 0.7;
    background: black;
  }

  .unselectable {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }

  // user defined
  .swiper-conatiner {
    width: 100%;
    margin: auto;
  }
</style>
