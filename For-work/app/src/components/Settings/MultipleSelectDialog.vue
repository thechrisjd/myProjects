<template>
  <v-layout row justify-center>
    <v-dialog v-model="value" fullscreen hide-overlay transition="dialog-bottom-transition">

      <v-card>
        <v-toolbar color="white" class="cocup-toolbar mb-4" dense>
          <v-btn icon @click="value = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title class="toolbar-title-centered grey--text body-2 font-weight-medium text-xs-center ml-3">
            Select {{type}} to add</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat left @click="onSave">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-layout justify-center row wrap>

          <v-flex xs11>
            <v-text-field id="searchInput" v-model="searchInput" solo clearable label="Search" type="text">
            </v-text-field>
          </v-flex>

          <v-flex xs11>
            <div v-if="selectedItems.length > 0">Selected</div>
            <v-chip label small color="grey darken-2" outline disabled v-for="item in selectedItems" :key="item" close
              @click="removeItem(item)">
              <v-icon left>label</v-icon>{{item}}
            </v-chip>
          </v-flex>

          <v-flex xs12>
            <v-list>
              <template v-for="(item, key) in searchResults">
                <v-divider v-if="key === 0" :key="item + '-divider-top'"></v-divider>

                <v-list-tile @click="addItem(item)" :key="item">
                  <v-list-tile-content>
                    <v-list-tile-title >
                      <text-highlight :queries="[searchInput]" highlightStyle="background-color: #c5e1a5;">{{ item }}</text-highlight>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider :key="item + '-divider'"></v-divider>
              </template>
            </v-list>
          </v-flex>
        </v-layout>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import _ from 'lodash'
import TextHighlight from 'vue-text-highlight';
import {
  skills,
  traits
} from './config.js';

export default {
  props: ['value', 'type'],
  components: {
    TextHighlight
  },
  watch: {
    // watch value to update the parent's the v-model
    value: function (isOpen) {
      if (isOpen) {
        this.reloadDialog()
      }
      this.$emit('input', isOpen)
    },
    searchInput: function (newVal) {
      this.searchFor(newVal)
    }
  },
  data() {
    return {
      skills,
      traits,
      searchInput: '',
      selectedItems: [],
      isEditing: false,
      searchResults: []
    }
  },
  methods: {
    onSave() {
      this.$emit('change', {type: this.type, selectedItems: this.selectedItems}); 
      this.$emit('input', false)
    },
    addItem(item) {
      this.selectedItems.push(item)
      this.searchInput = ''
      document.getElementById('searchInput').focus()
    },
    removeItem(item) {
      this.selectedItems = this.selectedItems.filter( value => {
        return value !== item
      })
    },
    reloadDialog() {
      this.searchInput = ''
      this.searchResults = []
      this.selectedItems = []

      // load data from user
      if (['skills', 'traits'].includes(this.type)) {
        this.selectedItems = _.clone(this.$store.state.user.studentInfo.tags[this.type], true) || []
      }
    },
    searchFor(searchInput) {

      if (!searchInput) {
        return this.searchResults = []
      }

      if (this.type === 'skills') {
        this.searchResults = this.skills.filter(skill => {
          return skill.toLowerCase().includes(searchInput.toLowerCase())
        }).slice(0, 5)
      }

      if (this.type === 'traits') {
        this.searchResults = this.traits.filter(trait => {
          return trait.toLowerCase().includes(searchInput.toLowerCase())
        }).slice(0, 5)
      }

      // if there are no results, display users input as first result
      if (this.searchResults.length === 0) {
        this.searchResults.push(searchInput)
      }
    }
  }
}

</script>