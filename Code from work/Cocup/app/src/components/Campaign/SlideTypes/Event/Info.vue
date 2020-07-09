<template>
  <div class="slide main" :style="'background:url(' + (mainSlide.params.images.background || '') + ')' ">
    
    <div class="left-half">
      <div class="campaign-type">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="rgba(255, 255, 255, 0.8)"
            d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
        </svg>
      </div>
      <div class="info-top">
        <!-- customize the component from here on -->
        <div class="event-date" style="font-size: 50px;">
          {{ new Date(mainSlide.params.date).getDate()}}
        </div>
        <div class="event-month-year">
          <div style="height: 25%;">{{ getMonthName(new Date(mainSlide.params.date)) }}</div>
          <div>{{ new Date(mainSlide.params.date).getFullYear() }}</div>
        </div>
      </div>
      <!-- location -->
      <div class="info-bottom">
        <svg style="width:24px;" viewBox="0 0 24 24" class="icon">
          <path fill="rgba(255, 255, 255, 0.8)"
            d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
        </svg>
        <div class="text-line">
          <div v-for="locationLine in mainSlide.params.location" :key="locationLine">{{ locationLine }}</div>
        </div>
      </div>
    </div>
    <!-- event title -->
    <div class="right-half">
      <div class="header">
        <div class="text" v-html="params.header"></div>
      </div>
    </div>
    <div class="logo" :style="'background-color:' + mainSlide.params.images.logoBackgroundColor || 'white' + ';'">
      <img :src="mainSlide.params.images.logo || defaults.companyLogoUrl" alt="">
    </div>
  </div>
</template>


<script>
import CButton from '../.././assets/C-Button'


export default {
  props: {
    campaign: {},
    params: {},
    isPrimarySlide: {
      type: Boolean,
      default () {
        return false
      }
    },
    mainSlide:{}
  },
  components: {
    CButton,
  },
  data() {
    return {
      defaults: {
        companyLogoUrl: 'https://cocup-images.s3.eu-central-1.amazonaws.com/1551875663508'
      }
    }
  },
  methods: {
    getMonthName(date) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      return monthNames[date.getMonth()]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../.././assets/info-slide.scss';

.slide.main {

  .left-half {
    .info-top {
      margin-top: -20px;
    }

    .info-bottom {
      .text-line {
        font-size: 8px;
      }
    }
  }

  .right-half {
    .text {
      overflow: hidden;
    }
  }
}

</style>
