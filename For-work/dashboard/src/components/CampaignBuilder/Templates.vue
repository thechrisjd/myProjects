<template>
  <v-dialog v-model="dialogActive" max-width="70vw">
    <v-card>
      <v-card-title class="headline">Select a new slide to add</v-card-title>
      <v-container grid-list-md grid-list-sm fluid>
        <v-layout row wrap>
          <v-flex v-for="(template, key) in templates[campaignType]" :key="key" d-flex xs12 sm6 md4 lg3 xl2>
            <v-hover>
              <v-card slot-scope="{ hover }" class="mx-1" color="grey lighten-4" width="220" hover ripple @click="addNewSlide(template.template)">
                <v-img :aspect-ratio="6/6" :src="template.imagePreview">
                  <v-expand-transition>
                    <div v-if="hover" class="transition-fast-in-fast-out black darken-1 v-card--reveal white--text px-3"
                      style="height: 100%;">
                      <div class="display-2 mt-3 mb-2">
                        {{ template.name }}
                      </div>
                      <div class="headline">
                        {{ template.description }}
                      </div>
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import * as companyModel from './SlideModels/Company/model.js'
import * as eventModel from './SlideModels/Event/model.js'
import * as jobModel from './SlideModels/Job/model.js'
import * as guideModel from './SlideModels/Guide/model.js'

export default {
  props: ["dialogActive", 'campaignType'],
  methods: {
    addNewSlide(template) {
      this.$emit("onSlideSelected", template);
      this.$emit('update:dialogActive', false)
    }
  },
  watch: {
    // if the dialog is closed by clicking outside the card -> bubble changes up to parent
    dialogActive: function (newVal) {
      this.$emit('update:dialogActive', newVal)
    }
  },
  data() {
    return {
      hover: '',
      templates: {
        company: companyModel.slideTemplates,
        event: eventModel.slideTemplates,
        job: jobModel.slideTemplates,
        guide: guideModel.slideTemplates
      }
    };
  }
};
</script>

<style lang="scss" scoped>

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

</style>
