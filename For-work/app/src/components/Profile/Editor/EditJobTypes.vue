<template>
  <v-container>
    <v-layout align-center justify-center fill-height row wrap class="text-xs-center">
      <v-flex xs12 sm7>
        <v-btn
          v-for="(item, index) in types"
          class="px-2"
          color="primary"
          depressed
          :outline="!selectedTypes.includes(item.id)"
          @click="toggle(item)"
          :key="index"
        >
          <v-icon small left>{{ item.icon }}</v-icon>
          {{ item.label }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import get from "lodash/get";
import debounce from "lodash/debounce";
import { jobTypes } from "../config";
import UserServiceMixin from '../../../mixins/UserService'

export default {
  mixins: [UserServiceMixin],
  created() {
    // 1. Emit title for parent to display
    this.$emit("setTitle", "Job Type");

    // 2. Set up debunce function for saving new value to store
    this.debounceSave = debounce(this.saveDataToStore, 1000);
  },

  data() {
    return {
      // 3. Assign value from store in data() to avoid initial watch triggering
      selectedTypes: this.$store.state.studentInfo.tags.jobTypes || [],
      types: jobTypes
    };
  },
  // 4. Deep watch model for changes and trigger debounce for each change
  watch: {
    selectedTypes: {
      deep: true,
      handler: function(newVal) {
        this.debounceSave();
      }
    }
  },
  // 5. Define how the data model should be saved in store
  methods: {
    saveDataToStore() {
      this.$store.commit("setStudentInfo", {
        key: "tags.jobTypes",
        value: this.selectedTypes
      });
    },
    toggle(value) {
      if (!this.selectedTypes.includes(value.id)) {
        // add
        this.selectedTypes.push(value.id);
      } else {
        // remove
        this.selectedTypes = this.selectedTypes.filter(e => e !== value.id);
      }
    }
  }
};
</script>
