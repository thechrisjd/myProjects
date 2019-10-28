<template>
  <v-container>
    <v-layout justify-center row wrap>
    <v-flex xs12 sm7>
      <v-select :items="['Male', 'Female', 'Other']" v-model="model.gender" box label="Gender">
      </v-select>
    </v-flex>
    <v-flex xs12 sm7>
      <v-text-field label="Phone number" type="number" box v-model="model.mobile"></v-text-field>
    </v-flex>
    <v-flex xs12 sm7>
      <v-divider class="mt-2 mb-4"></v-divider>
    </v-flex>

    <v-flex xs12 sm7>
      <p class="pb-3">Get better matches with companies by specifying your work status and preferences.</p>
      <v-checkbox v-model="model.status.isAkasseMember" label="I am a member of an A-kasse" hide-details>
      </v-checkbox>
      <v-checkbox v-model="model.status.isUnionMember" label="I am a member of a trade union">
      </v-checkbox>
      <v-divider></v-divider>

      <v-checkbox v-model="model.status.hasOwnCompany" label="I have my own company" hide-details>
      </v-checkbox>
      <v-checkbox v-model="model.status.wantsOwnCompany" label="I would like to start a company">
      </v-checkbox>
      <v-divider></v-divider>

      <v-checkbox v-model="model.status.willingToWorkOutsideDk" label="I would like to work outside of Denmark"
        hide-details></v-checkbox>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>

import get from 'lodash/get'
import { education } from '../config'
import debounce from 'lodash/debounce'
import UserServiceMixin from '../../../mixins/UserService'

  export default {
    mixins: [UserServiceMixin],
    created() {
      // 1. Emit title for parent to display
      this.$emit('setTitle', 'Bio')

      // 2. Set up debunce function for saving new value to store
      this.debounceSave = debounce(this.saveDataToStore, 1000)
    },

    data() {
      return {
        // 3. Assign value from store in data() to avoid initial watch triggering
        model: {
          gender: this.$store.state.studentInfo.profile.gender,
          mobile: this.$store.state.studentInfo.profile.mobile,
          status: this.$store.state.studentInfo.status,
        },
        config: education
      }
    },
    // 4. Deep watch model for changes and trigger debounce for each change
    watch: {
      model: {
        deep: true,
        handler: function (newVal) {
          this.debounceSave()
        }
      }
    },
    // 5. Define how the data model should be saved in store
    methods: {
      saveDataToStore() {
        this.$store.commit('setStudentInfo', {key: 'education', value: this.model})
      },
    },
  }
</script>
