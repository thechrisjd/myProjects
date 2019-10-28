<template>

  <v-layout row wrap>
    <p class="header" v-if="params.header">{{params.header}}</p>
    <div class="video">
      <youtube :video-id="videoId" player-width="96%" player-height="180px" @ready="ready"></youtube>
    </div>
  </v-layout>

</template>

<script>
import { getIdFromURL } from 'vue-youtube-embed'

export default {
  props: ['params'],
  watch: {
    'params.youtubeUrl': {
      handler: function (newVal) {
        this.videoId = getIdFromURL(newVal)
      }
    }
  },
  data() {
    return {
      videoId: '',
      event: null
    }
  },
  created() {
    this.videoId = getIdFromURL(this.params.youtubeUrl)
    
    const self = this
    const EventBus = require('../../eventBus.js').EventBus
    
    EventBus.$on('slideChange', clickCount => {
      self.pause()
    });

  },
  methods: {
    ready(event) {
      this.event = event
    },
    pause() {
      if (this.event) {
        this.event.target.pauseVideo()
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.video {
  margin-top: 5%;
  width: 100%;
  height: 100%;
}
.header {
  margin-bottom: 5%;
  margin-top: 3%;

}

</style>
