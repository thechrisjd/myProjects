<template>
  <div class="slide-general">
      <p>Find Us on Social Media</p>
      <div class="platforms">
        <a v-if="params.facebook" :href="params.facebook" target="_blank" @click="recordClick(params.facebook)">
          <img src="/img/templates/ui/social-media/icon-facebook.png" alt="">
        </a>
        <a v-if="params.instagram" :href="params.instagram" target="_blank" @click="recordClick(params.instagram)">
          <img src="/img/templates/ui/social-media/icon-instagram.png" alt="">
        </a>
        <a v-if="params.twitter" :href="params.twitter" target="_blank" @click="recordClick(params.twitter)">
          <img src="/img/templates/ui/social-media/icon-twitter.png" alt="">
        </a>
        <a v-if="params.linkedin" :href="params.linkedin" target="_blank" @click="recordClick(params.linkedin)">
          <img src="/img/templates/ui/social-media/icon-linkedin.png" alt="">
        </a>
      </div>
  </div>
</template>

<script>
export default {
  props: ['campaignId', 'params'],
  methods: {
    recordClick(url) {
      const user = this.$store.state.user

      this.$http.post('/v1/interactions', {
        student: user._id,
        campaign: this.campaignId,
        type: 'BUTTON',
        name: 'social-media',
        description: {
          url: url
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>

.slide-general {
  width: 100%;
  height: 100%;
  margin-top: 15%;

  .platforms {
    img {
      $img-width: 13%;
      width: $img-width;
      height: $img-width;
      margin: 0 5px;
    }  
  } 
}

</style>
