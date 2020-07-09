<template>
  <div class="slide-general">
    <h2>{{ params.header}}</h2>
    <h4 class="my-1 mx-3">{{ params.subHeader}}</h4>
    <div class="text" style="font-size:12px" v-html="params.paragraph" ></div>
    <c-button class="cto-button" width="130px" :link="params.button.link" :campaignId='campaignId'>{{params.button.text}}</c-button>
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
  margin-top: 3%;

  .cto-button {
    margin-left: auto;
    margin-bottom: 15px;
    margin-top: 30px;
  }

  a.campaign.button {
    text-align: left;
  }

  .campaign.button>svg {
    width: 15px;
    height: 15px;
    position: absolute;

    right: 4px;
    margin-right: 6px;
  }
}

</style>
