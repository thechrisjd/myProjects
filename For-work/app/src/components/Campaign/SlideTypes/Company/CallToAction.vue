<template>
  <div class="slide-general">
    <h1>Contact</h1>
    <c-button :campaignId="campaignId" v-if="params.website" class="cto-button" width="130px" :link="params.website">Visit Website</c-button>
    <c-button :campaignId="campaignId" v-if="params.telephone" class="cto-button" width="130px" :telephone="params.telephone">{{ params.telephone }}</c-button>
    <c-button :campaignId="campaignId" v-if="params.email" class="cto-button" width="130px" :email="params.email">Send Email</c-button>
  </div>
</template>
<style lang="scss" scoped>

.slide-general {
  width: 100%;
  height: 100%;

  .cto-button {
    margin: auto;
    margin-bottom: 5px; 
  }

  h1 {
    margin: 5% 0 5% 0;
  }

  a.campaign.button {
    text-align: left;
  }

  .campaign.button > svg {
    width: 15px;
    height: 15px;
    position: relative;
    top: 2px;
    right: 4px;
    margin-right: 6px;
  }
}

</style>
<script>
import CButton from '../../assets/C-Button'

export default {
  props: ['params', 'type', 'campaignId'],
  components: {
    CButton
  }
}
</script>
