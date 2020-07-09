<template>
  <div>
    <div class="slide" >
        <!-- Primary slide receives all campaign to build its own slide data -->
        <main-slide v-if="slide.type === 'main'" :campaign="campaign" :params="slide.params"></main-slide>

        <!-- General slides receive the params only -->
        <contact-slide v-else-if="slide.type === 'contact'" :slide="slide" :mainSlide="campaign.slides[0]" :params="slide.params"></contact-slide>
        <description-slide v-else :campaign="campaign" :slide="slide" :mainSlide="campaign.slides[0]"></description-slide>
        <!-- <info-slide v-else-if="slide.type === 'info'" :params="slide.params" :mainSlide="campaign.slides[0]" :campaignId="campaign._id"></info-slide> -->
        

      <div class="stage">
        <div class="heart" :class="{ 'is-active': isFavourite }" @click="onFavouriteClicked"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MainSlide from './SlideTypes/Job/Main.vue'
import DescriptionSlide from './SlideTypes/Job/Description.vue'
import ContactSlide from './SlideTypes/Job/Contact.vue'

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
    }
  },
  components: {
    MainSlide,
    DescriptionSlide,
    ContactSlide
  },
  methods: {
    onFavouriteClicked() {
      this.$emit('update:isFavourite', !this.isFavourite)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './assets/campaign-ui.scss';


</style>
