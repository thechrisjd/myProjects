<template>
  <v-container grid-list-md text-xs-center id="step-2-container">
    <v-layout row>
      <v-flex xs12 md6 color="transparent">
        <v-toolbar color="cyan" dark tabs>
          <v-toolbar-title class="capitalize">{{ campaign.type }} Campaign</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn outline round @click.stop="templateDialogActive = true" v-if="campaign.type !== 'job' || $store.state.user.type === 'admin'">
            <v-icon left>add</v-icon>
            New Slide
          </v-btn>

          <template slot="extension">
            <v-tabs v-model="preview.activeIndex" centered color="transparent" slider-color="black">
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab v-for="(slide, key) in campaign.slides" :key="key" ripple>
                <div v-if="slide.type === 'main'">Main</div>
                <v-icon v-else-if="slide.type === 'image'">photo</v-icon>
                <v-icon v-else-if="slide.type === 'call-to-action'">contact_mail</v-icon>
                <v-icon v-else-if="slide.type === 'social-media'">people</v-icon>
                <v-icon v-else-if="slide.type === 'testimonial'">format_quote</v-icon>
                <v-icon v-else-if="slide.type === 'picture'">photo</v-icon>
                <v-icon v-else-if="slide.type === 'video'">ondemand_video</v-icon>
                <v-icon v-else-if="slide.type === 'text'">notes</v-icon>
                <v-icon v-else-if="slide.type === 'job-positions'">work</v-icon>
                <v-icon v-else-if="slide.type === 'info'">description</v-icon>
                <v-icon v-else-if="slide.type === 'we-are'">domain</v-icon>
                <v-icon v-else-if="slide.type === 'you-are'">person</v-icon>
                <v-icon v-else-if="slide.type === 'we-offer'">whatshot</v-icon>
                <v-icon v-else-if="slide.type === 'your-tasks'">work</v-icon>
                <v-icon v-else-if="slide.type === 'contact'">contact_mail</v-icon>
                <v-icon v-else>tab</v-icon>
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <!-- Tab contents -->
        <v-tabs-items v-model="preview.activeIndex">
          <v-tab-item v-for="(slide, key) in campaign.slides" :key="key" >
            <v-card v-if="(key !== 0 && campaign.type !== 'job') || ($store.state.user.type==='admin') ">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn flat icon small v-on="on" color="grey" @click="reorderSlide('left', key)" :disabled="key <= 1">
                    <v-icon>arrow_left</v-icon>
                  </v-btn>
                </template>
                <span>Move slide to left</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn flat icon small v-on="on" color="grey" @click="reorderSlide('right', key)" :disabled="key == (campaign.slides.length - 1)">
                    <v-icon>arrow_right</v-icon>
                  </v-btn>
                </template>
                <span>Move slide to right</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn flat icon small v-on="on" color="grey" @click="removeSlide(key)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete slide</span>
              </v-tooltip>



            </v-card>

            <!-- Import COMPANY slide types -->
            <div v-if="campaign.type === 'company'">
              <company-main-model v-if="slide.type === 'main'" :campaign="campaign" :slide="slide"></company-main-model>
              <company-video-model v-else-if="slide.type === 'video'" :params="slide.params"></company-video-model>
              <company-image-model v-else-if="slide.type === 'image'" :params="slide.params"></company-image-model>
              <company-cto-model v-else-if="slide.type === 'call-to-action'" :params="slide.params"></company-cto-model>
              <company-social-media-model v-else-if="slide.type === 'social-media'" :params="slide.params"></company-social-media-model>
              <company-testimonial-model v-else-if="slide.type === 'testimonial'" :params="slide.params"></company-testimonial-model>
              <company-text-slide-model v-else-if="slide.type === 'text'" :params="slide.params"></company-text-slide-model>
              <company-job-positions-model v-else-if="slide.type === 'job-positions'" :params="slide.params"></company-job-positions-model>
              <company-image-text-model v-else-if="slide.type === 'image-text'" :params="slide.params"></company-image-text-model>

              <v-card v-else>NOT IMPLEMENTED YET</v-card>
            </div>

            <!-- All EVENT slide types here -->
            <div v-else-if="campaign.type === 'event'">
              <event-main-model v-if="slide.type === 'main'" :campaign="campaign" :slide.sync="slide"></event-main-model>
              <event-info-model v-else-if="slide.type === 'info'" :params="slide.params"></event-info-model>

            </div>

            <!-- All JOB slide types here -->
            <div v-else-if="campaign.type === 'job'">
              <!-- TODO implement job type here -->
              <job-main-model v-if="slide.type === 'main'" :campaign="campaign" :slide.sync="slide"></job-main-model>
              <job-contact-model v-else-if="slide.type === 'contact'" :params="slide.params"></job-contact-model>
              <job-description-model v-else :params="slide.params" :type="slide.type"></job-description-model>

            </div>

            <!-- All GUIDE slide types here -->
            <div v-else-if="campaign.type === 'guide'">
              <!-- TODO implement guide type here -->
              <guide-main-model v-if="slide.type === 'main'" :campaign="campaign" :slide.sync="slide"></guide-main-model>
              <guide-info-model v-else-if="slide.type === 'info'" :params="slide.params"></guide-info-model>
            </div>

          </v-tab-item>
        </v-tabs-items>

      </v-flex>
      <v-flex xs0 md1></v-flex>
      <v-flex xs12 md5>
        <div class="preview-wrapper">
          <div class="iphone-frame">
            <campaign class="campaign" :campaign="campaign" :preview="true" @slideChange="openSlideTab" ref="campaign"></campaign>
          </div>
        </div>
      </v-flex>

      <!-- TEMPLATES dialog -->
      <templates-dialog :campaignType="campaign.type" :dialogActive.sync="templateDialogActive" @onSlideSelected="addNewSlide"></templates-dialog>

    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import TemplatesDialog from './Templates'
import Campaign from 'cocup-campaign'

// Company slide models
import CompanyMainModel from './SlideModels/Company/Main'
import CompanyVideoModel from './SlideModels/Company/Video'
import CompanyImageModel from './SlideModels/Company/Image'
import CompanyCtoModel from './SlideModels/Company/CallToAction'
import CompanySocialMediaModel from './SlideModels/Company/SocialMedia'
import CompanyTestimonialModel from './SlideModels/Company/Testimonial'
import CompanyTextSlideModel from './SlideModels/Company/Text'
import CompanyJobPositionsModel from './SlideModels/Company/JobPositions'
import CompanyImageTextModel from './SlideModels/Company/ImageText'


import EventMainModel from './SlideModels/Event/Main'
import EventInfoModel from './SlideModels/Event/Info'

import GuideMainModel from './SlideModels/Guide/Main'
import GuideInfoModel from './SlideModels/Guide/Info'

import JobMainModel from './SlideModels/Job/Main'
import JobDescriptionModel from './SlideModels/Job/Description'
import JobContactModel from './SlideModels/Job/Contact'

export default {
  components: {
    Campaign,
    TemplatesDialog,
    CompanyMainModel,
    CompanyVideoModel,
    CompanyCtoModel,
    CompanySocialMediaModel,
    CompanyTestimonialModel,
    CompanyImageModel,
    CompanyTextSlideModel,
    CompanyJobPositionsModel,
    CompanyImageTextModel,
    EventMainModel,
    EventInfoModel,
    GuideMainModel,
    GuideInfoModel,
    JobMainModel,
    JobDescriptionModel,
    JobContactModel,

  },
  watch: {
    campaign: {
      deep: true,
      handler: function (newVal) {
        // console.log('campaign changed in step 2')
        this.$emit('update:campaign', newVal)
      }
    },
    'preview.activeIndex': function (newVal) {
      console.log('watch preview.activeIndex:', newVal)
      this.openCampaignSlide(newVal)
    }
  },
  props: ['campaign'],
  data() {
    return {
      templateDialogActive: false,
      validation: {
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
      },
      preview: {
        activeIndex: 0
      }
    }
  },
  mounted() {
    this.forceUpdateByChangingSlides()
  },
  methods: {
    // opens the editor box
    openSlideTab(activeIndex) {
      this.preview.activeIndex = activeIndex
    },
    // slides to right preview slide
    openCampaignSlide(index = 0) {
      const self = this
      // add timeout so element has time to render before scrolling
      setTimeout(() => {
        self.$refs.campaign.slideTo(index)
      }, 50);
    },
    addNewSlide (template) {
      // clone slide template so that the reference does not get pushed
      this.campaign.slides.push(_.cloneDeep(template))
      // swipe to newly added slide
      const newSlideIndex = this.campaign.slides.length - 1
      this.openSlideTab(newSlideIndex)
    },
    reorderSlide (direction, key) {
      // handle edge cases
      const limit = this.campaign.slides.length - 1
      if ((key >= limit && direction === 'right') || (key <= 0 && direction === 'left')) {
        return console.log('Key out of bounds.')
      }

      if (direction === 'left') {
        this.move(key, (key - 1), this.campaign.slides)
        this.preview.activeIndex = key - 1
      }

      if (direction === 'right') {
        this.move(key, (key + 1), this.campaign.slides)
        this.preview.activeIndex = key + 1
      }

      // force the update on the editor cards and the campaign preview slides
      // this.$forceUpdate();
      this.forceUpdateByChangingSlides()
    },
    // this is a hacky way to force a re-render of the slides
    // solves a bug where slides were stuck
    forceUpdateByChangingSlides() {
      const slides = this.campaign.slides
      this.campaign.slides = []
      const self = this
      setTimeout(() => {
        self.campaign.slides = slides
        self.openCampaignSlide(0)
      }, 50);
    },
    move (from, to, arr) {
      const elementToMove = arr[from]
      arr[from] = arr[to]
      arr[to] = elementToMove
    },
    removeSlide (index) {
      const confirmedDelete = confirm('Are you sure you want to delete this slide?')
      if (confirmedDelete) {
        this.campaign.slides.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss">

ul {
  list-style-type: circle;
}

#step-2-container {
  min-height: 800px;
}

.preview-wrapper {

  .iphone-frame {
    background-image: url('/img/templates/ui/campaign-builder/iphone-x-frame-v2.png');
    background-size: contain;
    width: 300px;
    height: 600px;
    position: absolute;

    .campaign {
      zoom: 65%;
      margin-top: 220px;

      .slide.primary {
        background-color: white !important;
      }
    }
  }
}

.panel-header {
  font-weight: 500;
  text-transform: capitalize;
}


.swiper-button-next:hover, .swiper-button-prev:hover {
  background-color: rgba(255, 255, 255, 0.90);
}

.swiper-button-next:focus, .swiper-button-prev:focus {
  outline: none;
}

.swiper-button-next, .swiper-button-prev {
  background-color: rgba(255, 255, 255, 0.70);
  width: 35px;
  height: 60px;
  border-radius: 15px;
}

.swiper-button-next {
  right: 3px;
}

.swiper-button-prev {
  left: 6px;
}

.capitalize {
  text-transform: capitalize;
}

.gray-background {
  background-color: #fafafa;
}

</style>
