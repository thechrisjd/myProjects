<template>
  <v-flex xs11 v-if="!ui.isLoading">
    <v-toolbar color="elevation-1" class="mb-3">
      <v-toolbar-title v-if="isNewCampaign">Create a new campaign</v-toolbar-title>
      <v-toolbar-title v-else-if="botCampaign">Edit bot campaign</v-toolbar-title>
      <v-toolbar-title v-else>Update your campaign</v-toolbar-title>
    </v-toolbar>

    <v-stepper v-model="ui.stepper.step">
      <v-stepper-header>
        <v-stepper-step :complete="ui.stepper.step > 1" step="1">Select campaign type</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="ui.stepper.step > 2" step="2">Create your campaign</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Select campaign settings</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-5 step-card">
            <editor-step-1 :campaign.sync="campaign" @typeSelected="onCampaignTypeSelected"></editor-step-1>
          </v-card>
          <v-layout justify-end>
            <v-btn color="primary" @click="ui.stepper.step = 2" :disabled="!campaign.type">
              Continue
            </v-btn>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-layout justify-end class="mb-4">
            <v-btn flat @click="ui.stepper.step = 1">Back</v-btn>
            <v-btn color="primary" @click="ui.stepper.step = 3">
              Continue
            </v-btn>
          </v-layout>
          <editor-step-2 v-if="ui.stepper.step === 2" :campaign.sync="campaign"></editor-step-2>
        </v-stepper-content>

        <v-stepper-content step="3">
          <editor-step-3 :campaign.sync="campaign"></editor-step-3>

          <v-layout justify-end>
            <v-btn flat @click="ui.stepper.step = 2">Back</v-btn>
            <v-btn :loading="ui.submitBtn.loading" :disabled="ui.submitBtn.loading" color="success" type="submit" form="formstep3" @click="submit">
              Submit Campaign
              <span slot="ui.submitBtn.loading">Loading...</span>
            </v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-card class="my-3 pa-3" v-if="campaign.csvData">
      <div class="headline mb-3">Raw campaign data from crawler</div>
      <vue-json-pretty :data="campaign.csvData"></vue-json-pretty>
    </v-card>

    <!-- <vue-json-pretty :data="campaign"></vue-json-pretty> -->

  </v-flex>
  <v-flex xs11 v-else>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
    <div>Loading</div>
  </v-flex>

</template>

<script>
import VueJsonPretty from 'vue-json-pretty'

import EditorStep1 from '../components/CampaignBuilder/EditorStep1'
import EditorStep2 from '../components/CampaignBuilder/EditorStep2'
import EditorStep3 from '../components/CampaignBuilder/EditorStep3'
import * as config from '../components/CampaignBuilder/config.js'

// Campaign models
import * as companyModel from '../components/CampaignBuilder/SlideModels/Company/model.js'
import * as eventModel from '../components/CampaignBuilder/SlideModels/Event/model.js'
import * as guideModel from '../components/CampaignBuilder/SlideModels/Guide/model.js'
import * as jobModel from '../components/CampaignBuilder/SlideModels/Job/model.js'

import _ from 'lodash'

export default {
  name: "resource-edit",
  components: {
    EditorStep1,
    EditorStep2,
    EditorStep3,
    VueJsonPretty
  },
  created() {
    if (this.$route.query.botCampaign) {
      this.botCampaign = true
    }

    if (this.isNewCampaign) {
      // check if there is a campaign locally that wasn't submitted
      if (this.$store.state.editor.campaign) {
        const response = confirm("You have previously been creating a new campaign that was not submitted. \n\nDo you want to continue editing it? If not, your changes will be overwritten.");
        if (response === true) {
          // disable loading
          this.ui.isLoading = false
          // load previously edited campaign from store
          console.log('Restoring campaign from store...')
          return this.campaign = this.$store.state.editor.campaign
        }
      }
      this.$store.commit('clearCampaign')
      console.log('Setting up new campaign...')
      this.initNewCampaign()
    } else {
      console.log('Loading campaign from server...')
      this.initUpdateCampaign()
    }
  },
  data() {
    return {
      loader: '',
      campaign: {},
      botCampaign: false,
      ui: {
        stepper: {
          step: this.isNewCampaign ? 0 : 1
        },
        submitBtn: {
          loading: false,
          disabled: false
        },
        isLoading: true, // default is true - so that functions are not triggered unti data is in.
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    isNewCampaign() {
      return this.id === 'new'
    },
  },
  watch: {
    'ui.stepper.step': () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    },
    campaign: {
      deep: true,
      handler: function (newCampaignVal) {
        if (this.isNewCampaign) {
          // only save changes when creating a new campaign
          this.$store.commit('setCampaign', newCampaignVal)
        }
      }
    },
    'campaign.type': function (newTypeVal, oldTypeVal) {
      // only update campaign type if the value has changed to something else.
      if (oldTypeVal) {
        this.onCampaignTypeSelected(newTypeVal)
        console.warn('Campaign type has changed. This resets the campaign.')
      }
    }
  },
  methods: {
    onCampaignTypeSelected(type) {
      // set campaign type and respective default slide
      this.campaign.type = type
      switch (type) {
        case 'company':
          this.campaign.slides = [companyModel.defaultMainSlide]
          break;
        case 'event':
          this.campaign.slides = [eventModel.defaultMainSlide]
          break;
        case 'job':
          const fixedSlides = jobModel.slideTemplates.map(element => element.template)
          this.campaign.slides = [jobModel.defaultMainSlide].concat(fixedSlides)
          break;
        case 'guide':
          this.campaign.slides = [guideModel.defaultMainSlide]
          break;
      }
    },
    initNewCampaign() {
      // load default empty campaign
      this.campaign = _.cloneDeep(config.newCampaignTemplate) // clone campaign, otherwise the config will be overwritten

      // load company (user's) id into campaign
      const companyId = this.$store.state.user._id
      if (!companyId) {
        alert('Error: Could not create new campaign. Missing user id.')
      }
      this.campaign.company = companyId

      //change the start date to today
      this.campaign.preferences.duration.start = new Date().toISOString().substr(0, 10)

      // disable loading
      this.ui.isLoading = false
    },
    initUpdateCampaign() {
      const campaignId = this.$route.params.id

      // skip step 1
      this.ui.stepper.step = 2

      const self = this
      const requestUrl = this.botCampaign ? '/v1/bot-campaigns/' : '/v1/campaigns/'

      this.$http.get(requestUrl + campaignId)
        .then((response) => {
          if (response.data.success === true) {
            self.onSuccessfullRequest(response.data.payload)
          } else {
            self.onFailedRequest(response.data)
          }
        })
        .catch(function (error) {
          self.onFailedRequest(error)
        });
    },
    onSuccessfullRequest(campaign) {
      if (!campaign) {
        return this.$router.push('/campaigns')
      }
      this.ui.isLoading = false
      this.campaign = campaign
    },
    onFailedRequest() {
      this.ui.isLoading = false
      alert('Could not load your campaign. Please try again later.' + error)
    },
    submit() {
      this.ui.submitBtn.loading = true

      // TODO change bool isNewCampaign to String type (enum: bot, new, update)
      this.isNewCampaign ? this.submitNewCampaign() : this.botCampaign ? this.submitBotCampaign() : this.submitUpdateCampaign()
    },
    submitNewCampaign() {
      const self = this
      this.createCampaignName()
      console.log('Submitting new campaign...')

      this.$http
        .post("/v1/campaigns", this.campaign)
        .then((response) => {
          self.onSuccessfullSubmission(response.data)
        })
        .catch(function (error) {
          self.onFailedSubmission(error)
        });
    },
    submitUpdateCampaign() {
      const self = this
      console.log('Submitting updated campaign...')
      this.$http
        .put("/v1/campaigns/" + this.campaign._id, {
          campaign: this.campaign
          })
        .then((response) => {
          self.onSuccessfullSubmission(response.data)
        })
        .catch(function (error) {
          self.onFailedSubmission(error)
        });
    },
    submitBotCampaign() {
      console.log('Submitting bot campaign...')
      const self = this

      // make user the campaign owner
      this.campaign.company = this.$store.state.user._id

      this.$http.post('/v1/bot-campaigns', {
        campaign: this.campaign
      })
        .then((response) => {
          self.onSuccessfullSubmission(response.data)
        })
        .catch(function (error) {
          self.onFailedSubmission(error)
        });
    },
    onSuccessfullSubmission(respData) {
      if (this.isNewCampaign) {
        this.$store.commit('clearCampaign')
      }
      this.$router.push({name: 'campaigns', params: {campaignSaved: true}})
    },
    onFailedSubmission(error) {
      this.ui.submitBtn.loading = false
      alert("Sorry! We couldn't submit your campaign at the moment. Please try again.")
    },
    createCampaignName() {
      if (!this.campaign.name) {
        const mainSlide = this.campaign.slides[0]
        if (this.campaign.type === 'job') {
          this.campaign.name = mainSlide.params.contentInformation.jobType + ': ' + mainSlide.params.contentInformation.jobTitle
        }
      }
    }
  }
};
</script>

<style>



</style>
