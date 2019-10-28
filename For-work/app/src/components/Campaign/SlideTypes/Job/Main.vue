<template>
  <div class="slide main" :style="'background:url(' + (params.images.background || '') + ')' ">
    <div class="left-half">
      <div class="campaign-type">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="rgba(255, 255, 255, 0.8)"
            d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
        <span class="type-name">{{ params.subType === 'Part time jobs' ? 'Student job' : params.subType || 'Job' }}</span>
      </div>
      <div class="info-top">
        <!-- customize the component from here on -->
        <div class="job-name">
          <div>{{params.jobTitle}}</div>
        </div>
        <div class="company-name">{{params.companyName}}</div>
      </div>
      <!-- deadline -->
      <div class="info-bottom">
        <svg style="width:24px;" viewBox="0 0 24 24" class="icon">
          <path fill="rgba(255, 255, 255, 0.8)"
            d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
        </svg>
        <div class="deadline">
          <span v-if="params.deadline">
            {{params.deadline.text}}
          </span>
          <span v-else>
            Posted
          </span>
        </div>
        <div class="job-date">
          <span v-if="params.deadline">
            {{new Date(params.deadline.date).toDateString()}}
          </span>
          <span v-else>
            {{params.postingDate}}
          </span>
        </div>
      </div>
    </div>
    <!-- job title -->
    <div class="right-half">
      <div class="header">
        <div class="text">
          {{ params.header }}
        </div>
      </div>
      <c-button id="cto-button" :campaignId="campaign._id" :link="params.button.link">
        {{ params.button.text }}</c-button>
    </div>
    <div v-if="params.images.logo" class="logo" :style="'background-color:' + params.images.logoBackgroundColor || 'white' + ';'">
      <img :src="params.images.logo">
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
    }
  },
  components: {
    CButton,
  },
  data() {
    return {
      defaults: {
        // companyLogoUrl: 'https://cocup-images.s3.eu-central-1.amazonaws.com/1551875663508'
      }
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import '../.././assets/main-slide.scss';

.slide.main {
  .left-half {

    .info-top {

      .job-name {
        font-size: 80% !important;
        font-weight: bold;
      }

      .company-name {
        font-size: 13px;
      }
    }

    .info-bottom {
      bottom: 20%;

      .icon {
        height: 30px;
      }

      .deadline {
        font-size: 10px;
      }

      .job-date {
        font-size: 12px;
        font-weight: bold;
        line-height: 10px;
      }
    }
  }
}
</style>
