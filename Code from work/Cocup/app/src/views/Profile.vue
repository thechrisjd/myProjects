<template>
  <v-container>
    <div style="height: 50px;"></div>
    <v-layout row wrap class="text-xs-center">
      <v-flex xs12>
        <v-avatar size="120" color="transparent">
          <img v-if="user.studentInfo.profile.profilePicture" :src="user.studentInfo.profile.profilePicture"
            alt="User picture">
          <v-icon v-else x-large>account_circle</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex xs12>
        <h2 class="my-2">{{ user.studentInfo.profile.firstName + ' ' + user.studentInfo.profile.lastName }}</h2>
        {{ user.studentInfo.tags.university }}
        <br>
        {{ user.studentInfo.tags.fieldOfStudy }}
      </v-flex>
    </v-layout>

    <v-layout class="mt-4">
      <v-flex v-if="!user.studentInfo.tags.skills || user.studentInfo.tags.skills.length === 0">
        <v-alert :value="true" type="info">
          Add your skills and traits below to better stand out for companies.
        </v-alert>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>
    <v-layout class="mt-4" row wrap>
      <v-flex xs12>
        <div class="subheading">Skills, tools and Competences
          <v-btn flat icon small color="black" @click="openEditorDialog('skills')">
            <v-icon small>edit</v-icon>
          </v-btn>
        </div>
        <v-chip v-for="skill in user.studentInfo.tags.skills" color="primary" small text-color="white" :key="skill" disabled>
          {{ skill }}</v-chip>
      </v-flex>
      
      <v-flex xs12 class="mt-5">
        <div class="subheading">Personality traits
          <small>(Values & Interests)</small>
          <v-btn flat icon small color="black" @click="openEditorDialog('traits')">
            <v-icon small>edit</v-icon>
          </v-btn>
        </div>

        <v-chip v-for="trait in user.studentInfo.tags.traits" color="green" small text-color="white" :key="trait" disabled>
          {{ trait }}</v-chip>
      </v-flex>

    </v-layout>

    <!-- Mutliple select dialog (for skills and traits) -->
    <multiple-select-dialog v-model="ui.tagEditorDialog" :type="ui.tagEditorType" @change="onTagsChange">
    </multiple-select-dialog>


    <v-snackbar v-model="snackbar.active" :timeout="snackbar.timeout" multi-line>
      {{ snackbar.text }}
      <v-btn :color="snackbar.color" flat @click="snackbar.active = false">
        Close
      </v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
import { skills, traits } from '../components/Settings/config.js'
import MultipleSelectDialog from '../components/Settings/MultipleSelectDialog'

export default {
  created() {
    
  },
  components: {
    MultipleSelectDialog
  },
  data() {
    return {
      user: this.$store.state.user,
      ui: {
        quickEdit: false,
        tagEditorDialog: false,
        tagEditorType: ''
      },
      config: {
        traits,
        skills
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
    onTagsChange(newVal) {

      if (['skills', 'traits'].includes(newVal.type)) {
        this.user.studentInfo.tags[newVal.type] = newVal.selectedItems
      }

      // submit to server
      // this.submitUser()
    },
    openEditorDialog(type) {
      if (['skills', 'traits'].includes(type)) {
        this.ui.tagEditorDialog = true
        this.ui.tagEditorType = type
      }
    },
    successfullSubmission(resp) {
      const user = resp.data.payload
      if (user) {
        this.$store.commit('setUser', user)
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
  }
}
</script>
