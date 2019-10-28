<template>
  <div>
    <v-dialog v-model="value" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="white" class="cocup-toolbar mb-4" dense>
          <v-btn icon @click="value = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title class="toolbar-title-centered red--text text--darken-4">Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click="submitUser" :disabled="!isEditing">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-expansion-panel focusable class="mb-4">
          <v-expansion-panel-content expand-icon="mdi-menu-down">
            <template v-slot:header>
              <v-flex xs2>
                <v-icon>info</v-icon>
              </v-flex>
              <div>Account</div>
            </template>
            <v-card>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 class="mb-4">
                    <div class="title">Email address</div>
                    <div class="subheaing">{{user.email}}</div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field outline label="First Name" v-model="user.studentInfo.profile.firstName">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field outline label="Last Name" v-model="user.studentInfo.profile.lastName"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content expand-icon="mdi-menu-down">
            <template v-slot:header>
              <v-flex xs2>
                <v-icon>account_circle</v-icon>
              </v-flex>
              <div>Profile</div>
            </template>
            <v-card>
              <v-container>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-menu ref="menu" v-model="datePickerMenu" :close-on-content-click="false" :nudge-right="50" lazy
                      transition="scale-transition" offset-y full-width min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="user.studentInfo.profile.dateOfBirth" outline label="Birthday date"
                          prepend-icon="event" readonly v-on="on">
                        </v-text-field>
                      </template>
                      <v-date-picker ref="picker" v-model="user.studentInfo.profile.dateOfBirth"
                        :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" @change="onDatePickerChange">
                      </v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field outline label="Mobile phone" prepend-icon="phone"
                      v-model="user.studentInfo.profile.telephone">
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field outline label="Location" prepend-icon="location_on"
                      v-model="user.studentInfo.profile.location">
                    </v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-select :items="['Male', 'Female', 'Other']" prepend-icon="wc"
                      v-model="user.studentInfo.profile.gender" outline label="Gender">
                    </v-select>
                  </v-flex>

                  <v-flex xs12>
                    <v-combobox :items="config.languages" prepend-icon="language"
                      v-model="user.studentInfo.tags.languages" multiple outline chips deletable-chips
                      label="Languages"></v-combobox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>


          <v-expansion-panel-content expand-icon="mdi-menu-down">
            <template v-slot:header>
              <v-flex xs2>
                <v-icon>school</v-icon>
              </v-flex>
              <div>Education</div>
            </template>
            <v-card>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-select :items="['DTU', 'Other']" label="University" outline
                      v-model="user.studentInfo.tags.university">
                    </v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-select v-model="user.studentInfo.tags.studyProgress"
                      :items="['Bachelor', 'Master', 'PhD', 'Nearly Graduated', 'Recently Graduated']"
                      label="Study Progression" outline></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-autocomplete v-model="user.studentInfo.tags.fieldOfStudy" :items="config.fieldsOfStudy" outline
                      label="Field of Study" cache-items flat hide-no-data hide-details item-text="name"
                      item-value="name">
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 class="mt-4">
                    <v-select :items="config.jobCategories" v-model="user.studentInfo.tags.category" outline
                      label="Career sector">
                    </v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content expand-icon="mdi-menu-down">
            <template v-slot:header>
              <v-flex xs2>
                <v-icon>book</v-icon>
              </v-flex>
              <div>Portfolio</div>
            </template>
            <v-card>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs11>
                    <v-text-field outline label="LinkedIn Profile Url"
                      v-model="user.studentInfo.profile.linkedinProfile"></v-text-field>
                  </v-flex>

                  <v-flex xs11>
                    <v-text-field outline label="Portfolio Website Url"
                      v-model="user.studentInfo.profile.portfolioWebsite"></v-text-field>
                  </v-flex>

                  <v-flex xs11>
                    <v-text-field outline label="GitHub username" v-model="user.studentInfo.profile.githubUsername">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content expand-icon="mdi-menu-down">
            <template v-slot:header>
              <v-flex xs2>
                <v-icon>stars</v-icon>
              </v-flex>
              <div>Extra Info</div>
            </template>
            <v-card>
              <v-container>
                <v-layout row wrap>
                  <p>Get better matches with companies by specifying your work status and preferences.</p>
                  <v-flex xs12>
                    <v-checkbox v-model="user.studentInfo.profile.isAkasseMember" label="I am a member of an A-kasse"
                      hide-details>
                    </v-checkbox>
                  </v-flex>
                  <v-flex xs12>
                    <v-checkbox v-model="user.studentInfo.profile.isUnionMember" label="I am a member of a trade union">
                    </v-checkbox>
                  </v-flex>

                  <v-divider></v-divider>
                  <v-flex xs12>
                    <v-checkbox v-model="user.studentInfo.profile.hasOwnCompany" label="I have my own company"
                      hide-details>
                    </v-checkbox>
                  </v-flex>
                  <v-flex xs12>
                    <v-checkbox v-model="user.studentInfo.profile.wantsOwnCompany"
                      label="I would like to start a company">
                    </v-checkbox>
                  </v-flex>
                  <v-divider></v-divider>
                  <v-flex xs12>
                    <v-checkbox v-model="user.studentInfo.profile.willingToWorkOutsideDk"
                      label="I would like to work outside of Denmark" hide-details></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel focusable>
          <v-expansion-panel-content expand-icon="mdi-menu-down">
            <template v-slot:header>
              <v-flex xs2>
                <v-icon>link</v-icon>
              </v-flex>
              <div>Privacy Policy</div>
            </template>
            <v-card>
              <v-card-text v-html="config.privacyPolicy"></v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content expand-icon="mdi-menu-down">
            <template v-slot:header>
              <v-flex xs2>
                <v-icon>link</v-icon>
              </v-flex>
              <div>Terms and Conditions</div>
            </template>
            <v-card>
              <v-card-text v-html="config.termsAndConditions"></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>



        <!-- <div style="height: 100%;">content</div> -->
        <v-container class="mt-5">
          <v-layout>
            <v-flex>
              <v-btn depressed="" block @click="forceReload">Update app</v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-btn class="red--text text--darken-4" depressed="" block @click="logout">Log out</v-btn>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex class="mt-5">
              <p class="text-xs-center grey--text">Version {{ version }}</p>
            </v-flex>
          </v-layout>
        </v-container>


      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.active" :timeout="snackbar.timeout" multi-line>
      {{ snackbar.text }}
      <v-btn :color="snackbar.color" flat @click="snackbar.active = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>


<script>

import { fieldsOfStudy, jobCategories, languages, privacyPolicy, termsAndConditions } from './config.js'

export default {
  props: ['value'],
  created() {
    // console.log('USER', this.user)
  },
  watch: {
    datePickerMenu: function (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    // watch value to update the parent's the v-model
    value: function (newVal) {
      this.$emit('input', newVal)
    },
    user: {
      deep: true,
      handler: function () {
        this.isEditing = true
      }
    }
  },
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      user: this.$store.state.user,
      isEditing: false,
      panel: [],
      datePickerMenu: '',
      config: {
        fieldsOfStudy,
        jobCategories,
        languages,
        privacyPolicy,
        termsAndConditions,
      },
      snackbar: {
        active: false,
        text: '',
        color: 'success',
        timeout: 5000
      }
    }
  },
  methods: {
    onDatePickerChange(val) {
      this.datePickerMenu = false
    },
    submitUser() {
      // close settings dialog
      this.$emit('input', false)

      this.$http.put('/v1/users/students', {
        user: this.user
      })
      .then(this.successfullSubmission)
      .catch(this.failedSubmission)
    },
    successfullSubmission(resp) {
      // reset editor when user is successfully saved on server
      this.isEditing = false

      const user = resp.data.payload
      if (user) {
        this.$store.commit('setUser', user)
        // this.$router.push({name: 'feed', params: {profileIntroSubmitted: true}})
        this.notify('Profile updated', 'success')
      } else {
        this.notify('Sorry, we could not update your information. Please try again.', 'error')
      }
    },  
    failedSubmission(err) {
      this.notify('Sorry, we could not update your information. Please try again.', 'error')
    },
    notify (text = '', color = 'primary', timeout = 5000) {
        this.snackbar.active = true
        this.snackbar.text = text
        this.snackbar.color = color
        this.snackbar.timeout = timeout
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('/welcome')
      window.location.reload(false) // reload page to clear vuex
    },
    forceReload() {
      window.location.reload(true)
    }
  },
}
</script>

<style lang="scss" scoped>

@import '../../assets/cocup-ui.scss';

.v-list {
  background-color: #e8e8e8;
}

</style>
