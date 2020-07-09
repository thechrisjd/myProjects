<template>
  <div class="slide-general">
    <h1 style=font-size:65px class="mt-2 mb-3">{{ params.jobPositions }}</h1>
    <p> job openings right now</p>

    <c-button class="cto-button mt-5" width="130px" :link="params.button.link" :campaignId='campaignId'>{{params.button.text}}</c-button>

  </div>

</template>
<script>
import CButton from '../../assets/C-Button'

export default {
  props: {
    campaignId: String,
    params: Object,
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    CButton
  }
}
</script>

<style lang="scss" scoped>

.slide-general {
  width: 100%;
  height: 100%;
}

.cto-button {
  margin: auto;
  margin-bottom: 5px;
}

a.campaign.button {
  text-align: left;
}

.campaign.button>svg {
  width: 15px;
  height: 15px;
  position: relative;
  top: 2px;
  right: 4px;
  margin-right: 6px;
}

</style>
