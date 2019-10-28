<template>
  <div>
    <v-card>
        <v-form>
          <v-container class="gray-background">

            <!--This information is for the name and desc of the event. Dont forget to add the v-model. Like to Main.vue -->

            <div class="title text-md-left mt-4 mb-2">Information</div>
            <v-flex md12 class="mt-3">
              <v-text-field  v-model="eventsModel.name" maxlength="75" label="Event name" box required></v-text-field>
            </v-flex>
              <!-- **************************************** -->
            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.contentInformation.hostedBy" label="Hosted by?" box>
              </v-text-field>
            </v-flex>
              <!-- **************************************** -->
            <v-flex md12 class="mt-3">
              <v-text-field v-model="eventsModel.contentInformation.context[0].title" label="Title" box></v-text-field>
              <v-text-field v-model="eventsModel.contentInformation.context[0].text" maxlength="1000" counter label="What is this event about?" textarea required></v-text-field>
            </v-flex>

            <v-flex xs12 md10>
                <v-text-field v-model="eventsModel.contentInformation.price" label="Fee or free?" box></v-text-field>
            </v-flex>

            <!--Event location -->

            <div class="title text-md-left mt-4 mb-2">Event location</div>
            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.preferences.location.address1" maxlength="50" counter label="Street address" box required></v-text-field>
            </v-flex>
                          <!-- ******************CHANGE THIS!!!!********************** -->
            <v-flex xs12 md10>
              <!--v-text-field v-model="eventsModel.preferences.location.city" maxlength="25" counter label="City" box required></v-text-field-->
              <v-select :items="regions" label="Regions" solo v-model="eventsModel.preferences.location.city" dense></v-select>
            </v-flex>
                          <!-- **************************************** -->


            <v-date-picker
              v-model="eventsModel.preferences.duration.time"
            >

            </v-date-picker>

            <!--v-flex xs12 md10>
              <v-text-field v-model="eventsModel.address3" maxlength="25" counter label="Address line 3" box required></v-text-field>
            </v-flex-->

            <!--Date picker html code -->
            <!--v-flex md12>
              <v-menu v-model="dateMenu" :close-on-content-click="true" :nudge-right="40" lazy transition="scale-transition"
              offset-y full-width min-width="290px">
              <v-text-field v-model="date" label="Event Date" prepend-icon="event" box readonly slot="activator">
              </v-text-field>
              <v-date-picker v-model="date"></v-date-picker>
            </v-menu>
          </v-flex-->

          <!--What langauge is the event -->
            <div class="title text-md-left mt-4 mb-2">Event Information</div>
            <v-flex xs12 md10>
              <v-subheader>
                Languages
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon small color="grey" dark v-on="on" right>info</v-icon>
                  </template>
                  <span>
                    Which language will the event be held in?
                  </span>
                </v-tooltip>
              </v-subheader>
              <v-combobox
                :items="languages"
                label="Start typing to get suggestions" multiple outline chips deletable-chips
                v-model="eventsModel.preferences.target.languages"
              ></v-combobox>
            </v-flex>

          <!--What Industry is the event -->

            <v-flex xs12 md10>
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
              <v-select :items="jobCategories" outline deletable-chips
                v-model="eventsModel.preferences.target.industry"
                label="Select one or more" multiple chips dense :rules="[v => !!v || 'You must select a category.']">
              </v-select>
            </v-flex>

              <!-- Decs event for users -->

            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.contentInformation.context[1].title" label="Title" box></v-text-field>
              <v-text-field v-model="eventsModel.contentInformation.context[1].text"maxlength="500" counter label="Benefits of event" box>
              </v-text-field>
            </v-flex>
              <!-- **************************************** -->
            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.contentInformation.context[2].title" label="Title" box></v-text-field>
              <v-text-field v-model="eventsModel.contentInformation.context[2].text" maxlength="500" counter label="Section" box>
              </v-text-field>
            </v-flex>
              <!-- **************************************** -->
            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.contentInformation.context[3].title" label="Title" box></v-text-field>
              <v-text-field v-model="eventsModel.contentInformation.context[3].text" maxlength="200" counter label="Section" box>
              </v-text-field>
            </v-flex>
              <!-- **************************************** -->
            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.contentInformation.context[4].title" label="Title" box></v-text-field>
              <v-text-field v-model="eventsModel.contentInformation.context[4].text" maxlength="500" counter label="Section" box>
              </v-text-field>
            </v-flex>
            <!-- **************************************** -->
          <v-flex xs12 md10>
            <v-text-field v-model="eventsModel.contentInformation.context[5].title" label="Title" box></v-text-field>
            <v-text-field v-model="eventsModel.contentInformation.context[5].text" maxlength="200" counter label="Who should come?" box>
            </v-text-field>
          </v-flex>
            <!--date and time -->

            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.preferences.duration.startDay" maxlength="25" counter label="Day" box>
              </v-text-field>
            </v-flex>

            <v-flex xs12 md10>
              <!--v-text-field v-model="eventsModel.preferences.duration.startMonth" maxlength="25" counter label="Month" box></v-text-field-->
                <v-select :items="months" label="Month" solo v-model="eventsModel.preferences.duration.startMonth" dense></v-select>
            </v-flex>

            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.preferences.duration.startTime" maxlength="25" counter label="Start time" box></v-text-field>
            </v-flex>

            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.preferences.duration.endTime" maxlength="25" counter label="End time" box></v-text-field>
            </v-flex>

            <v-flex xs12 md10>
              <v-text-field v-model="eventsModel.preferences.duration.lastReg" maxlength="25" counter label="Last registration date" box>
              </v-text-field>
            </v-flex>


            <!--Images and logo related to the event -->

            <div class="title text-md-left mt-4 mb-2" >Images</div>
            <v-layout row wrap>
              <v-flex xs12 md12 >
                <image-upload v-model="eventsModel.contentInformation.images.logo" align="left" label="Event Logo" :aspect-ratio="1/1" required></image-upload>
              </v-flex>
              <v-flex xs12 md12>
                <image-upload v-model="eventsModel.contentInformation.images.background" align="left" label="Background Image" :aspect-ratio="1/1" required></image-upload>
              </v-flex>
            </v-layout>

          <!--External urls and other actions -->

            <div class="title text-md-left mt-4 mb-2">Action button</div>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field  maxlength="15" counter label="Text on button" box required></v-text-field>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field  v-model="eventsModel.contentInformation.externalLink" label="Link" box required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="sendData()">Submit</v-btn>
        </v-form>
    </v-card>

    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      multi-line
      top
    >
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.active = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
//import VueJsonPretty from 'vue-json-pretty'
import {
  jobCategories, skills, languages, traits, regions, fee, months
} from "../models/config.js";
import eventsModel from '../models/Campaigns/Events/model.js'


//import _ from 'lodash'
  export default {
    created() {
      console.log(eventsModel)
    },
    data() {
      return {
        snackbar: {
          active: false,
          text: "",
          color: "info",
          timeout: 5000
        },
        skills,
        jobCategories,
        languages,
        traits,
        eventsModel,
        regions,
        fee,
        months
      }
    },
    methods : {
      reloadPage(){
         //this.$router.push('/campaigns')
         window.location.reload()
      },
      sendData () {
        let str = this.eventsModel.preferences.duration.time;
        var date = new Date(str);
        var shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;
        var shortName = shortMonthName(date);
        /*Date.prototype.getWeek = function() {
          var onejan = new Date(this.getFullYear(),0,1);
          return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
        }

        var today = new Date();
        var weekNumber = today.getWeek();*/
        let weekNumber = new Date(getFullYear(),0,1);
        console.log(weekNumber);
        //this.eventsModel.preferences.duration.startDay = str.slice(-2);
        //this.eventsModel.preferences.duration.startMonth = shortName;
        //console.log(shortName);
        //console.log(this.eventsModel)
        /*let obj = this.eventsModel

        if (obj.name === "") {
          this.notify(
            "Event name required.",
            "error"
          );
        } else if (obj.contentInformation.context[0].title === "") {
          this.notify(
            "Title description required.",
            "error"
          );
        } else if (obj.contentInformation.context[0].text === "") {
          this.notify(
            "Description required.",
            "error"
          );
        } else if (obj.contentInformation.price === "") {
          this.notify(
            "The fee is required. If the event is Free tpye Free.",
            "error"
          );
        } else if (obj.preferences.location.address1 === "") {
          this.notify(
            "The address to required.",
            "error"
          );
        } else if (obj.preferences.location.city.length === 0) {
          this.notify(
            "The region is required.",
            "error"
          );
        } else if (obj.preferences.target.industry.length === 0) {
          this.notify(
            "The industry is required.",
            "error"
          );
        } else if (obj.preferences.duration.startDay === "") {
          this.notify(
            "Start day is required.",
            "error"
          );
        } else if (obj.preferences.duration.startMonth === "") {
          this.notify(
            "Month is required.",
            "error"
          );
        } else if (obj.preferences.duration.startTime === "") {
          this.notify(
            "Start time is required.",
            "error"
          );
        } else if (obj.preferences.duration.endTime === "") {
          this.notify(
            "The time the event ends is required.",
            "error"
          );
        } else {
          this.$http.post("/v1/campaigns", obj)
              .then(res => {
                console.log('worked')
                this.reloadPage()
              }).catch(err => {
                console.log("Could not submit");
                this.notify(
                  "Could not " + err,
                  "error"
                );
              });*/
        //}

        //console.log(obj)
        /*this.$http.post("/v1/campaigns", obj)
            .then(res => {
              console.log('worked')
              this.reloadPage()
            }).catch(err => {
              console.log("Could not submit");
              this.notify(
                "Could not ",
                "error"
              );
            });*/
      },
      notify(text, color, timeout) {
        this.snackbar.text = text;
        if (color) this.snackbar.color = color;
        if (timeout) this.snackbar.timeout = timeout;

        this.snackbar.active = true;
      },
    }
  }
</script>
