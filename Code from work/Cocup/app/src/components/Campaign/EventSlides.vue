<template>
  <div>
    <div class="slide " >
        <!-- Primary slide receives all campaign to build its own slide data -->
        <main-slide v-if="slide.type === 'main'" :campaign="campaign" :params="slide.params"></main-slide>

        <!-- General slides receive the params only -->
        <info-slide v-else-if="slide.type === 'info'" :params="slide.params" :mainSlide="campaign.slides[0]"  :campaignId="campaign._id"></info-slide>
        
        <!-- TODO Add more slide types here... -->
      
        <slide-template v-else :type='slide.type'>NOT IMPLEMENTED YET: {{ slide.type }}</slide-template>

      <div class="stage">
        <div class="heart" :class="{ 'is-active': isFavourite }" @click="onFavouriteClicked"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MainSlide from './SlideTypes/Event/Main.vue'
import InfoSlide from './SlideTypes/Event/Info.vue'

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
    InfoSlide
   
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
