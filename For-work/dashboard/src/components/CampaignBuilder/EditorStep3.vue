<template>
  <div class="pa-2">
    <v-form ref="formstep3" v-model="valid">
      <v-layout>
        <div class="title mt-3">
          <v-icon>people_outline</v-icon>
          Specify your target audience
        </div>
        <v-flex md2>
          <v-subheader></v-subheader>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center class="my-4">
        <v-flex md4>
          <v-subheader>
            Categories
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon color="grey" dark small v-on="on" right>info</v-icon>
              </template>
              <span>
                The sector of your target audience
                <br>
                Be selective in order to get good matches
              </span>
            </v-tooltip>
          </v-subheader>
        </v-flex>
        <v-flex md6>
          <v-select :items="jobCategories" v-model="campaign.preferences.target.categories" outline deletable-chips
            label="Select one or more" multiple chips dense :rules="[v => !!v || 'You must select a category.']">
          </v-select>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center>
        <v-flex md4>
          <v-subheader>
            Study Progression
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon color="grey" dark small v-on="on" right>info</v-icon>
              </template>
              <span>
                The study progress of your target audience
                <br>
                Be selective in order to get good matches
              </span>
            </v-tooltip>
          </v-subheader>
        </v-flex>
        <v-flex md6>
          <v-select v-model="campaign.preferences.target.studyProgress" outline deletable-chips
            :items="['Bachelor', 'Master', 'PhD', 'Nearly Graduated', 'Recently Graduated']" label="Select one or more"
            multiple chips></v-select>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center class="my-4">
        <v-flex md4>
          <v-subheader>
            Skills, tools and Competences
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon color="grey" dark small v-on="on" right>info</v-icon>
              </template>
              <span>
                If you are looking for special competences,
                <br>
                e.g. Design Thinking, AutoCad, HTML, Supply Chain Management
              </span>
            </v-tooltip>
          </v-subheader>
        </v-flex>
        <v-flex md6>
          <v-combobox :items="skills" label="Start typing to get suggestions or add your own" multiple outline chips deletable-chips @input="afterselection"
            v-model="campaign.preferences.target.skills"></v-combobox>
        </v-flex>
      </v-layout>


      <v-layout row wrap align-center class="my-4">
        <v-flex md4>
          <v-subheader>
            Personality traits (Values & Interests)
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small color="grey" dark v-on="on" right>info</v-icon>
              </template>
              <span>
                If you are looking for special interest or traits 
                <br>
                e.g. Open-minded, Open Source, ambitious, hardworking 
              </span>
            </v-tooltip>
          </v-subheader>
        </v-flex>
        <v-flex md6>
          <v-combobox :items="traits" label="Start typing to get suggestions or add your own" multiple outline chips deletable-chips
            v-model="campaign.preferences.target.traits"></v-combobox>
        </v-flex>
      </v-layout>


      <v-layout row wrap align-center class="my-4">
        <v-flex md4>
          <v-subheader>
            Required Languages
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small color="grey" dark v-on="on" right>info</v-icon>
              </template>
              <span>
                Select which languages are required at your company.
              </span>
            </v-tooltip>
          </v-subheader>
        </v-flex>
        <v-flex md6>
          <v-combobox :items="languages" label="Start typing to get suggestions" multiple outline chips deletable-chips
            v-model="campaign.preferences.target.languages"></v-combobox>
        </v-flex>
      </v-layout>

      <v-divider class="mb-5"></v-divider>

      <v-layout row wrap align-center>
        <div class="title">
          <v-icon>insert_chart_outlined</v-icon>
          How would you like to receive news regarding your campaign's performance?
          <v-chip outline disabled color="primary" class="ml-5">Coming soon</v-chip>
        </div>
        <v-flex md6 class="mb-4 mt-3 ml-3" style="min-width:420px">
          <v-select class="mt-4" v-model="campaign.preferences.report" :items="config.notifications" disabled outline
            item-text="name" item-value="value" label="Select one or more" multiple chips></v-select>
        </v-flex>
      </v-layout>

      <v-divider class="mb-3"></v-divider>

      <v-layout row wrap v-if="campaign.type === 'company'">
        <v-flex xs12>

          <div class="title mb-2 mt-4">
            <v-icon>notifications_none</v-icon>
            Coffee Notifications
          </div>
        </v-flex>
        <v-flex xs12>
          <p>Here you can customize the content we show students when they receive a cup of coffee from you.</p>
        </v-flex>

        <v-flex xs5 class="mt-2">
          <h4 class="mb-3">Call to Action button</h4>
          <v-select v-model="campaign.preferences.coffeeNotifications.button.type" outline
            :items="['website', 'email', 'telephone']" label="Type"></v-select>

          <!-- display different values based on what type is selected -->
          <v-text-field label="Text on button" counter maxlength="20" placeholder="Visit our website" outline
            v-if="campaign.preferences.coffeeNotifications.button.type === 'website'"
            v-model="campaign.preferences.coffeeNotifications.button.text"></v-text-field>

          <v-text-field label="Text on button" counter maxlength="20" placeholder="Email us" outline
            v-if="campaign.preferences.coffeeNotifications.button.type === 'email'"
            v-model="campaign.preferences.coffeeNotifications.button.text"></v-text-field>

          <v-text-field label="Text on button" counter maxlength="20" placeholder="Call us" outline
            v-if="campaign.preferences.coffeeNotifications.button.type === 'telephone'"
            v-model="campaign.preferences.coffeeNotifications.button.text"></v-text-field>


          <v-text-field label="Website URL" v-if="campaign.preferences.coffeeNotifications.button.type === 'website'" outline
            v-model="campaign.preferences.coffeeNotifications.button.value"></v-text-field>

          <v-text-field label="Email address" v-if="campaign.preferences.coffeeNotifications.button.type === 'email'" outline
            v-model="campaign.preferences.coffeeNotifications.button.value"></v-text-field>

          <v-text-field label="Phone number" v-if="campaign.preferences.coffeeNotifications.button.type === 'telephone'" outline
            v-model="campaign.preferences.coffeeNotifications.button.value"></v-text-field>
        </v-flex>

        <v-flex xs-1></v-flex>

        <v-flex xs6 class="mt-3">
          <v-textarea v-model="campaign.preferences.coffeeNotifications.text" maxlength="240" class="mt-2" counter
            label="Display Text" outline required></v-textarea>
        </v-flex>

      </v-layout>

      <v-divider class="mt-5" v-if="campaign.type === 'company'"></v-divider>

      <div v-if="campaign.type === 'event'">
        <v-layout>
          <div class="title mb-3 mt-5">
            <v-icon>calendar_today</v-icon>
            Set your campaign's duration
          </div>
        </v-layout>
        <p>
          Campaign starts on
          <code>{{campaign.preferences.duration.start}}</code>
          <span v-if="runIndefinitely"> and it has no end date.</span>
          <span v-if="!runIndefinitely"> and it ends on </span>
          <code v-if="!runIndefinitely && campaign.preferences.duration.end">{{campaign.preferences.duration.end}}</code>
          <code v-if="!runIndefinitely && !campaign.preferences.duration.end">please select below.</code>
        </p>

        <v-switch v-model="runIndefinitely" label="Campaign has no end date"></v-switch>
        <v-layout fill-height justify-start class="mt-3 mb-5">
          <v-flex xs12 md2>
            <v-menu v-model="ui.calendarDialog1" :close-on-content-click="true" :nudge-right="40" lazy
              transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field v-model="campaign.preferences.duration.start" label="Choose start date" prepend-icon="event"
                readonly slot="activator"></v-text-field>
              <v-date-picker v-model="campaign.preferences.duration.start"
                :min="new Date(new Date().setDate(new Date().getDate()-1)).toISOString()" :first-day-of-week="1">
              </v-date-picker>
            </v-menu>
          </v-flex>
          <div class="mx-5" v-show="!runIndefinitely">
            <v-icon x-large>arrow_right_alt</v-icon>
          </div>
          <v-flex xs12 md2 v-show="!runIndefinitely">
            <v-menu v-model="ui.calendarDialog2" :close-on-content-click="true" :nudge-right="40" lazy
              transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field v-model="campaign.preferences.duration.end" label="Choose end date" prepend-icon="event"
                readonly slot="activator"></v-text-field>
              <v-date-picker v-model="campaign.preferences.duration.end" :min="campaign.preferences.duration.start"
                show-current :disabled="runIndefinitely" :first-day-of-week="1"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </div>

    </v-form>
  </div>
</template>

<script>
import {
  jobCategories, skills, languages, traits
} from "./config.js";

export default {
  props: ["campaign"],
  watch: {
    campaign: {
      handler: function (newVal) {
        this.$emit("update:campaign", newVal);
      },
      deep: true,
    },
    runIndefinitely: function (newVal) {
      if (newVal === true) {
        this.campaign.preferences.duration.end = null;
      }
    }
  },
  created() {
    this.initCoffeeNotificationsForOldCampaigns()

    // set whether campaign runs indefinitely
    if (this.campaign.preferences.duration.end) {
      this.runIndefinitely = false
    }

    // parse datetime to date strings that is valid for v-datepicker
    if (this.campaign.preferences.duration.start) {
      this.campaign.preferences.duration.start = new Date(this.campaign.preferences.duration.start).toISOString().slice(0, 10)
    }
    if (this.campaign.preferences.duration.end) {
      this.campaign.preferences.duration.end = new Date(this.campaign.preferences.duration.end).toISOString().slice(0, 10)
    }

  },
  data() {
    return {
      skills,
      jobCategories,
      languages,
      traits,
      runIndefinitely: true,
      valid: true,
      contact: {
        email: true,
        website: true,
        phone: true
      },
      // temporary object to merge into skills
      target: {
        tools: [],
        values: []
      },
      config: {
        notifications: [{
            name: "Instant Notifications",
            value: "instant"
          },
          {
            name: "Weekly Report",
            value: "weekly"
          },
          {
            name: "Bi-Weekly Report",
            value: "bi-weekly"
          },
          {
            name: "Monthly Report",
            value: "monthly"
          },
        ]
      },
      ui: {
        calendarDialog1: false,
        calendarDialog2: false,
      }
    };
  },
  methods: {
    initCoffeeNotificationsForOldCampaigns() {
      // init coffee notifications object if doesnt exist to support older campaigns
      // remove this in the future when all campaigns contain this object
      if (!this.campaign.preferences.coffeeNotifications) {
        this.campaign.preferences.coffeeNotifications = {
          text: '',
          button: {
            type: '',
            text: '',
            value: ''
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>


</style>
