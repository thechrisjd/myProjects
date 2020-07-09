<template>
    <v-card>
        <v-form>
            <v-container class="gray-background">
                <div class="title text-md-left mt-4 mb-2">Information</div>
                <v-flex md12 class="mt-3">
                    <v-select :items="jobTypes" v-model="slide.params.contentInformation.jobeType" box label="Position type" required></v-select>
                </v-flex>
                <v-flex md12 class="mt-3">
                    <v-select :items="industry" v-model="slide.params.contentInformation.industry" box label="industry" required></v-select>
                </v-flex>
                <v-flex md12 class="mt-3">
                    <v-text-field v-model="slide.params.contentInformation.jobTitle" maxlength="70" counter box label="Job Title" required></v-text-field>
                </v-flex>
                <v-flex md12 class="mt-3">
                    <v-text-field v-model="slide.params.contentInformation.companyName" maxlength="30" counter box label="Company Name" required>
                    </v-text-field>
                </v-flex>
                <!-- Crawled campaigns do not have a deadline -->
                <div v-if="slide.params.deadline">
                    <v-flex md12 class="mt-3">
                        <v-text-field v-model="slide.params.deadline.text"  maxlength="30" counter box label="Deadline title" placeholder="Apply before" required></v-text-field>
                    </v-flex>
                    <v-flex md12>
                        <v-menu v-model="menu2" :close-on-content-click="true" :nudge-right="40" lazy
                            transition="scale-transition" offset-y full-width min-width="290px">
                            <v-text-field v-model="date" label="Choose deadline" prepend-icon="event" readonly box
                                slot="activator"></v-text-field>
                            <v-date-picker v-model="date" @input="dateChanged" :min="new Date(new Date().setDate(new Date().getDate()-1)).toISOString()" :first-day-of-week="1"></v-date-picker>
                        </v-menu>
                    </v-flex>
                </div>

                <v-flex md12 class="mt-3">
                    <v-combobox :items="languages" label="Start typing to get suggestions" multiple outline chips deletable-chips
                      v-model="slide.params.contentInformation.language"></v-combobox>
                </v-flex>

                <div class="title text-md-left mt-4 mb-2">Short description</div>
                <v-flex md12 class="mt-3">
                    <v-text-field v-model="slide.params.contentInformation.shortDescriptionText" maxlength="60" counter label="Short description" box required>
                    </v-text-field>
                </v-flex>

                <div class="title text-md-left mt-4 mb-2">Full description</div>
                <v-flex md12 class="mt-3">
                    <v-text-field v-model="slide.params.contentInformation.fullDescriptionText" maxlength="60" counter label="Short description" box required>
                    </v-text-field>
                </v-flex>

                <div class="title text-md-left mt-4 mb-2">Images</div>
                <v-layout row wrap>
                    <v-flex xs12 md12>
                        <image-upload align="left" v-model="slide.params.contentInformation.images.logo" label="Company Logo" :aspect-ratio="1/1" required>
                        </image-upload>
                    </v-flex>
                    <v-flex xs12 md12>
                        <image-upload align="left" v-model="slide.params.contentInformation.images.background" label="Background Image" :aspect-ratio="1/1" required>
                        </image-upload>
                    </v-flex>
                </v-layout>

                <div class="title text-md-left mt-4 mb-2">Call to Action button</div>
                <v-layout>
                    <v-flex xs12 md4>
                        <v-text-field v-model="slide.params.contentInformation.button.text" maxlength="16" counter label="Text on button" box required></v-text-field>
                    </v-flex>
                    <v-flex xs12 md8>
                        <v-text-field v-model="slide.params.contentInformation.button.link" label="Link" box required>
                        </v-text-field>
                    </v-flex>
                </v-layout>


                <div class="title text-md-left mt-4 mb-2">External application link</div>
                  <v-layout>
                      <v-flex xs12 md8>
                        <v-text-field v-model="slide.params.contentInformation.externalJobUrl" label="Link" box required>
                          </v-text-field>
                      </v-flex>
                  </v-layout>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
import {
  jobCategories, skills, languages, traits
} from "../../config.js";
export default {
  props: ['campaign', 'slide'],
  created() {
    if (this.slide.params.deadline.date) {
      this.date = new Date(this.slide.params.deadline.date).toISOString().substr(0, 10)
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      languages,
      jobTypes: [{
          text: 'Full-time job',
          value: ['Full time jobs']
        },
        {
          text: 'Student job',
          value: ['Part time jobs']
        },
        {
          text: 'Internship',
          value: 'Internships'
        },
        {
          text: 'Project',
          value: 'Projects'
        },
        {
          text: 'Graduate program',
          value: 'Graduate programmes'
        },
        {
          text: 'Temporary position',
          value: 'Temporary Positions'
        },
        {
          text: 'Voluntary work',
          value: 'Voluntary work'
        },
        {
          text: 'Thesis',
          value: 'Thesis'
        },
        {
          text: 'Freelance',
          value: 'Freelance'
        },
        {
          text: 'PhD / Research job',
          value: 'PhD / Research jobs'
        },
      ],
      industry : [{
        text: 'It',
        value: ['It']
      },
      {
        text: 'Bio',
        value: ['Bio']
      },]
    }
  },
  methods: {
    dateChanged: function (newVal) {
      this.slide.params.deadline.date = new Date(newVal)
      this.campaign.preferences.duration.end = newVal
      this.$emit('update:slide', this.slide.params.deadline)
    }
  }
}
</script>
