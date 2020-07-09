<template>
  <div>
    <v-card>
      <v-form>
        <v-container class="gray-background">
          <v-flex>
            <p>This slide is the face of your event campaign.</p>
          </v-flex>

          <div class="title text-md-left mt-4 mb-2">Information</div>
          <v-flex md12 class="mt-3">
            <v-text-field v-model="campaign.name" maxlength="50" counter label="Name of the campaign (Not shown publicly)" box required></v-text-field>
          </v-flex>
          <v-flex md12 class="mt-3">
            <v-text-field v-model="slide.params.header" maxlength="50" counter label="Short description" box required></v-text-field>
          </v-flex>
          <v-flex md12>
            <v-menu v-model="dateMenu" :close-on-content-click="true" :nudge-right="40" lazy transition="scale-transition"
            offset-y full-width min-width="290px">
            <v-text-field v-model="date" label="Event Date" prepend-icon="event" box readonly slot="activator">
            </v-text-field>
            <v-date-picker v-model="date"></v-date-picker>
          </v-menu>
        </v-flex>

        <div class="title text-md-left mt-4 mb-2">Event location</div>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.location[0]" maxlength="25" counter label="Address line 1" box required></v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.location[1]" maxlength="25" counter label="Address line 2" box required></v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.location[2]" maxlength="25" counter label="Address line 3" box required></v-text-field>
        </v-flex>
      </v-container>
    </v-form>
  </v-card>
  <v-card>
    <v-form>
      <v-container class="gray-background">
        <v-flex>
          <p>This part contains additional information about your event.</p>
        </v-flex>
        <div class="title text-md-left mt-4 mb-2">Event Information</div>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.name" counter maxlength="25" label="Name" box>
          </v-text-field>
        </v-flex>
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
          <v-combobox :items="languages" label="Start typing to get suggestions" multiple outline chips deletable-chips
            v-model="slide.params.target.languages"></v-combobox>
        </v-flex>
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
          <v-select :items="jobCategories" v-model="slide.params.target.categories" outline deletable-chips
            label="Select one or more" multiple chips dense>
          </v-select>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[0].title1" maxlength="25" counter label="What is this event about?" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[0].text1" maxlength="100" counter label="Short description of scope" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[1].title2" maxlength="25" counter label="End goals of this event" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[1].text2" maxlength="50" counter label="Main keywords" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[2].title3" maxlength="25" counter label="Does this event cater to a specific audience?" box>
          </v-text-field>
          <v-combobox :items="targetAudience" label="Start typing to get suggestions" multiple outline chips deletable-chips
            v-model="slide.params.contentInformation[2].text3"></v-combobox>
        </v-flex>
        <v-flex>
          <p>Is your event structured in multiple parts. If yes, please fill in the fields below.</p>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[3].title4" maxlength="25" counter label="Title - part one" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[3].text4" maxlength="50" counter label="Description - part one" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[4].title5" maxlength="25" counter label="Title - part two" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[4].text5" maxlength="50" counter label="Description - part two" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[5].title6" maxlength="25" counter label="Title - part three" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.contentInformation[5].text6" maxlength="50" counter label="Description - part three" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.test" maxlength="25" counter label="Test" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.enabled" counter label="Enabled" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.type" maxlength="25" counter label="What type of event is this?" box>
          </v-text-field>
        </v-flex>
        <v-flex xs12 md10>
          <v-text-field v-model="slide.params.price" counter label="Is there a fee?" box>
          </v-text-field>
        </v-flex>

        <div class="title text-md-left mt-4 mb-2" >Images</div>
        <v-layout row wrap>
          <v-flex xs12 md12 >
            <image-upload align="left" v-model="slide.params.images.logo" label="Event Logo" :aspect-ratio="1/1" required></image-upload>
          </v-flex>
          <v-flex xs12 md12>
            <image-upload align="left" v-model="slide.params.images.background" label="Background Image" :aspect-ratio="1/1" required></image-upload>
          </v-flex>
        </v-layout>

        <div class="title text-md-left mt-4 mb-2">Action button</div>
        <v-layout>
          <v-flex xs12 md4>
            <v-text-field v-model="slide.params.button.text" maxlength="15" counter label="Text on button" box required></v-text-field>
          </v-flex>
          <v-flex xs12 md8>
            <v-text-field v-model="slide.params.button.link" label="Link" box required></v-text-field>
          </v-flex>
        </v-layout>

      </v-container>
    </v-form>
  </v-card>
</div>
</template>

<script>
  import { languages, jobCategories, targetAudience } from "../../config.js";

  export default {
    props: ['campaign', 'slide'],
    watch: {
      date: function (newVal) {
        this.slide.params.date = new Date(newVal)
        this.$emit('update:slide', this.slide.params)
      }
    },
    created() {
      if (this.slide.params.date) {
        this.date = new Date(this.slide.params.date).toISOString().substr(0, 10)
      }
    },
    data() {
      return {
        languages,
        jobCategories,
        targetAudience,
        date: new Date().toISOString().substr(0, 10),
        dateMenu: false,
      }
    }
  }
</script>
