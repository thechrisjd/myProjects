<template>
  <div>
    <!-- Job details -->
    <v-card>
      <v-form>
        <v-container class="light-background">
          <div class="title my-2">Job details</div>

          <v-flex>
            <v-subheader>Job search title</v-subheader>
            <v-text-field v-model="jobsModel.name" maxlength="50" counter label="Title" box required></v-text-field>
          </v-flex>

          <v-flex>
            <v-subheader>What job are you posting?</v-subheader>
            <v-text-field v-model="jobsModel.preferences.target.jobType" maxlength="50" counter label="Job type" box required></v-text-field>
          </v-flex>

          <v-flex>
            <v-subheader>Enter job title below:</v-subheader>
            <v-textarea v-model="jobsModel.contentInformation.jobTitle"></v-textarea>
          </v-flex>

          <v-flex>
            <v-subheader>Enter job description below:</v-subheader>
            <v-textarea box v-model="jobsModel.contentInformation.jobDescriptionText"></v-textarea>
          </v-flex>

          <v-flex>
            <v-subheader>Select the industry type:</v-subheader>
            <v-select v-model="jobsModel.preferences.target.industry" :items="jobCategories" outline deletable-chips
            label="Select one or more" multiple chips dense :rules="[v => !!v || 'You must select a category.']">
            </v-select>
          </v-flex>

          <v-flex>
            <v-subheader>Study progression:</v-subheader>
            <v-text-field v-model="jobsModel.preferences.target.studyProgress" maxlength="50" counter label="e.g. Looking for a student in their last year of studies?" box>
            </v-text-field>
          </v-flex>

          <v-flex>
            <v-subheader>What skills are required for this job?</v-subheader>
            <v-select v-model="jobsModel.preferences.target.skills" :items="skills" outline deletable-chips label="Select one or more" multiple chips dense :rules="[v => !!v || 'You must select a skill.']">
            </v-select>
          </v-flex>

          <!--v-flex>
            <v-subheader>What skills would be nice to have?</v-subheader>
            <v-text-field v-model="jobsModel.preferences.target.requiredSkills" maxlength="50" counter label="Secondary Skills" box>
            </v-text-field>
          </v-flex-->

          <v-flex>
            <v-subheader>What traits are you looking for in a potential candidate?    </v-subheader>
            <v-select v-model="jobsModel.preferences.target.traits" :items="traits" outline deletable-chips label="Select one or more" multiple chips dense>
            </v-select>
          </v-flex>

          <v-flex>
            <v-subheader>Languages:</v-subheader>
            <v-select v-model="jobsModel.preferences.target.languages" :items="languages" outline deletable-chips label="Select one or more" multiple chips dense>
            </v-select>
          </v-flex>


          <v-card>
            <v-form>
              <v-container class="light-background">
                <div class="title text-md-left mt-4 mb-2">We are looking for.</div>
                <v-flex>
                  <v-textarea v-model="jobsModel.preferences.target.lookingFor.template.params.description" box label="Company description">
                  </v-textarea>
                </v-flex>
              </v-container>
            </v-form>
          </v-card>




          <v-flex xs12 md12 >
            <image-upload align="left" label="Job Logo" :aspect-ratio="1/1" required></image-upload>
          </v-flex>
          <v-flex xs12 md12>
            <image-upload align="left" label="Background Image" :aspect-ratio="1/1" required></image-upload>
          </v-flex>
        </v-container>
      </v-form>
    </v-card>

    <!-- Job benefits -->
    <v-card>
      <v-form>
        <v-container class="light-background">
          <div class="title text-md-left mt-4 mb-2">Job benefits</div>

          <v-flex>
            <v-subheader>Describe your work culture</v-subheader>
            <v-textarea v-model="jobsModel.contentInformation.jobBenefits.description" box>
            </v-textarea>
          </v-flex>

          <v-flex>
            <v-subheader>Does the job offer any benefits?</v-subheader>
            <v-text-field v-model="jobsModel.contentInformation.jobBenefits.name" maxlength="50" counter box>
            </v-text-field>
          </v-flex>

          <div class="title text-md-left mt-4 mb-2">Contact Information</div>
          <v-flex>
            <v-text-field v-model="jobsModel.contentInformation.contactInfo.name" box label="Contact name">
            </v-text-field>
            <v-text-field v-model="jobsModel.contentInformation.contactInfo.template.params.email" box label="Contact email">
            </v-text-field>
            <v-text-field v-model="jobsModel.contentInformation.contactInfo.template.params.telephone" box label="Phone number">
            </v-text-field>
          </v-flex>
        </v-container>
      </v-form>
    </v-card>

    <!-- Company info -->
    <v-card>
      <v-form>
        <v-container class="light-background">
          <div class="title text-md-left mt-4 mb-2">Company information</div>
          <v-flex>
            <v-text-field v-model="jobsModel.contentInformation.companyDescription.name" box label="Company name">
            </v-text-field>
            <v-textarea v-model="jobsModel.contentInformation.companyDescription.description" box label="Company description">
            </v-textarea>
            <v-text-field v-model="jobsModel.preferences.location.address1" box label="Street address">
            </v-text-field>
            <v-text-field v-model="jobsModel.preferences.location.city" box label="City">
            </v-text-field>
          </v-flex>
        </v-container>
      </v-form>
    </v-card>


        <div class="title text-md-left mt-4 mb-2">Action button</div>
        <v-layout>
          <v-flex xs12 md4>
            <v-text-field  v-model="jobsModel.contentInformation.button.text" maxlength="15" counter label="Text on button" box required></v-text-field>
          </v-flex>
          <v-flex xs12 md8>
            <v-text-field  v-model="jobsModel.contentInformation.button.link" label="Link" box required></v-text-field>
          </v-flex>
        </v-layout>
    <v-btn @click="sendData()">Submit</v-btn>
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
  jobCategories, skills, languages, traits
} from "../models/config.js";
import jobsModel from '../models/Campaigns/Jobs/model.js'

//import _ from 'lodash'
export default {
  created() {
    console.log(jobsModel)
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
      jobsModel
    }
  },
  methods : {
    reloadPage(){
       this.$router.push('/campaigns')
    },
    sendData () {
      //console.log(this.jobsModel)
      let obj = this.jobsModel

      if (obj.name === "") {
        this.notify(
          "Job name is required.",
          "error"
        );
      } else if (obj.preferences.target.jobType.length === 0) {
        this.notify(
          "Job type is required.",
          "error"
        );
      } else if (obj.contentInformation.jobTitle === "") {
        this.notify(
          "Job title is required.",
          "error"
        );
      } else if (obj.contentInformation.jobDescriptionText === "") {
        this.notify(
          "The job description is required.",
          "error"
        );
      } else if (obj.preferences.target.industry.length === 0) {
        this.notify(
          "Industry is required.",
          "error"
        );
      } else if (obj.preferences.target.studyProgress.length === 0) {
        this.notify(
          "Level of education is required.",
          "error"
        );
      } else if (obj.preferences.target.skills.length === 0) {
        this.notify(
          "Skills are required.",
          "error"
        );
      } else if (obj.preferences.target.languages.length === "") {
        this.notify(
          "Lanuage is required.",
          "error"
        );
      } else if (obj.contentInformation.contactInfo.name === "") {
        this.notify(
          "Hiring manager name required.",
          "error"
        );
      } else if (obj.contentInformation.contactInfo.template.params.email === "" || obj.contentInformation.contactInfo.template.params.telephone === "") {
        this.notify(
          "Contact email or phone is required.",
          "error"
        );
      } else if (obj.preferences.location.address1 === "") {
        this.notify(
          "Address is required.",
          "error"
        );
      } else if (obj.preferences.location.city.length === 0) {
        this.notify(
          "Region is required.",
          "error"
        );
      } else if (obj.contentInformation.button.link === "") {
        this.notify(
          "Application link required.",
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
                "Server error.",
                "error"
              );
            });
      }
      //console.log(obj)
      /*this.$http.post("/v1/campaigns", obj)
          .then(res => {
            console.log('worked')
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
