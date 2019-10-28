<template>
  <v-dialog v-model="value.active" class="info-dialog-wrapper" max-width="800">
    <a class="close-button fas fa-times" @click="closeDialog"></a>

    <v-card v-if="value.active" class="info-dialog-content">
      <div class="cover-photo">
        <!-- <img src="https://source.unsplash.com/random/500x160"> -->
      </div>

      <v-avatar class="item-logo elevation-3" color="white">
        <img
          v-if="value.item.contentInformation.images.logo"
          :src="value.item.contentInformation.images.logo"
          alt="avatar"
        />
        <v-icon v-else color="grey" x-large>business_center</v-icon>
      </v-avatar>

      <v-card-text class="px-3">
        <div class="title font-weight-bold mt-2">{{ value.item.contentInformation.jobTitle }}</div>
        <div class="subheading mt-3 mb-4">
          At {{ value.item.contentInformation.companyDescription.name }}
          <div class="action-buttons action-buttons-big hidden-xs-only">
            <save-button :campaignId="this.value.item._id"></save-button>

            <v-btn
              round
              small
              color="green lighten-1"
              style="float:right;"
              class="mr-2 white--text"
              :href="value.item.contentInformation.button.link"
              target="_blank"
            >
              Apply
              <v-icon right dark>link</v-icon>
            </v-btn>
          </div>
        </div>

        <section>
          <div class="short-information">
            <v-layout align-top justify-center class="text-xs-center mb-2">
              <v-flex xs1 class="text-xs-right">
                <v-icon medium>business_center</v-icon>
              </v-flex>
              <v-flex xs11 class="text-xs-left ml-3 mt-1">
                <div>{{value.item.preferences.target.jobType[0] || 'Fulltime'}}</div>
              </v-flex>
            </v-layout>

            <v-layout align-top justify-center class="text-xs-center mb-2">
              <v-flex xs1 class="text-xs-right">
                <v-icon medium>place</v-icon>
              </v-flex>

              <v-flex xs11 class="text-xs-left ml-3 mt-1">
                <div>{{ value.item.preferences.location.address1 }}</div>
              </v-flex>
            </v-layout>

            <v-layout align-top justify-center class="text-xs-center mb-2">
              <v-flex xs1 class="text-xs-right">
                <v-icon medium>event</v-icon>
              </v-flex>

              <v-flex xs11 class="text-xs-left ml-3 mt-1">
                <div>{{ getTimeString(value.item.preferences.duration.applicationStartDate) }}</div>
              </v-flex>
            </v-layout>

            <v-layout align-top justify-center class="text-xs-center mb-2">
              <v-flex xs1 class="text-xs-right">
                <v-icon medium>how_to_reg</v-icon>
              </v-flex>

              <v-flex xs11 class="text-xs-left ml-3 mt-1 mr-3">
                <div
                  class="skill-chip large-chips"
                  v-for="(skill, index) in value.item.preferences.target.skills"
                  :key="index"
                >{{ skill }}</div>
              </v-flex>
            </v-layout>
          </div>
          <div>
            <div class="section-header mt-5 ml-2">About the job</div>

            <div class="item-description">{{value.item.contentInformation.jobDescriptionText}}</div>
          </div>
        </section>

        <v-layout row wrap class="mt-4">
          <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Find out more</div>
                  <span>Browse the job and get in touch with your next employer!</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <!-- <v-btn flat dark>Apply now</v-btn> -->
                <v-btn
                  flat
                  color="green lighten-1"
                  style="float:right;"
                  class="mr-2 white--text"
                  :href="value.item.contentInformation.button.link"
                  target="_blank"
                >
                  Apply now
                  <v-icon right dark>link</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="closeDialog">Close</v-btn>
      </v-card-actions>

      <!-- Buttons save and apply for the small screen -->
      <div class="action-buttons action-buttons-small hidden-sm-and-up">
        <save-button :campaignId="this.value.item._id"></save-button>

        <v-btn
          round
          small
          color="green lighten-1"
          style="float:right;"
          class="mr-2 white--text"
          :href="value.item.contentInformation.button.link"
          target="_blank"
        >
          Apply
          <v-icon right dark>link</v-icon>
        </v-btn>
      </div>

      <!-- Buttons save and apply for the big screen -->
    </v-card>
  </v-dialog>
</template>

<script>
import Mark from "mark.js";
import FeedItemMixins from "../../mixins/FeedElementMixins";
import SaveButton from "./FeedElementDialogSaveButton";

export default {
  props: ["value"],
  components: { SaveButton },
  mixins: [FeedItemMixins],
  watch: {
    "value.active": function() {
      if (this.value.active === true) {
        // dialog opened

        console.log({ value: this.value.item._id });
        const self = this;
        setTimeout(() => {
          self.highlightKeywordsInHtml();
        }, 100);
      }
    }
  },
  data: () => {
    return {
      item: {
        isFavourite: true
      }
    };
  },
  methods: {
    closeDialog: function() {
      this.$emit("input", {
        active: false,
        item: null
      });
    },
    highlightKeywordsInHtml() {
      const keywords = this.value.item.preferences.target.skills || [];

      const instance = new Mark(document.querySelector("div.item-description"));
      instance.mark(keywords, {
        className: "marked-text",
        accuracy: "exactly"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-avatar{
  width: 90px !important;
  height: 90px !important;
}
.v-dialog {
  max-width: 600px;
  position: relative;

  a.close-button {
    font-size: 40px;
    font-weight: thin;
    color: #eeeeee;
    position: relative;
    z-index: 2;
    left: 85%;
    top: 25px;
  }
}
.subheading{
  position: relative;
}
.info-dialog-content {
  border-radius: 25px;
  font-size: 12px;
  width: 100%;
  //overflow: hidden;
  margin-top: -40px;
  position: relative;

  .action-buttons {
    background-color: #fff;
    display: flex;
    justify-content: space-around;
  }

  .action-buttons-small {
    position: sticky;
    bottom: -1px;
    left: 0;
    right: 0;

    .save-button,
    .v-btn {
      width: 100px;
    }
  }

  .action-buttons-big {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 280px;
    bottom: unset;
    left: unset;

    .save-button,
    .v-btn {
      width: 130px;
    }
  }
}

.info-dialog-wrapper {
  border-radius: 25px;
}

.cover-photo {
  height: 100px;
  background-color: #455a64;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  background:
    /* top, transparent red, faked with gradient */ linear-gradient(
      rgba(255, 17, 0, 0.24),
      rgba(255, 0, 0, 0.48)
    ),
    url("https://source.unsplash.com/random/600x100");
  background-repeat: no-repeat;
  background-size: cover;

  // img {
  //   width: 100%;
  // }
}


.item-logo {
  margin: auto;
  display: flex;
  margin-top: -50px;
}

.section-header {
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 500;
}

.section-header::after {
  content: "";
  position: absolute;
  background-color: #455a64;
  width: 50%;
  height: 1px;
  margin: 10px;
}

section {
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 600px) {
  section {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .short-information {
      min-width: 200px;
    }

    .mt-5 {
      margin-top: 0px !important;
    }
  }
  .px-3 {
    padding: 0 50px !important;
  }
}
</style>


<style lang="scss">
// .info-dialog-content.v-card.v-sheet.theme--light {
//   box-shadow: none;
//   border-radius: 25px;
// }
.v-dialog {
  overflow-y: scroll;
  box-shadow: none;

  &::-webkit-scrollbar {
    width: 2px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    width: 2px;
    background-color: rgb(109, 106, 106);
  }
  &::-webkit-scrollbar-button,
  ::-webkit-scrollbar-corner {
    width: 2px;
    background-color: transparent;
  }
}
// mark.js style
.marked-text {
  background: #ddffb6 !important;
}

img {
    width: 100%;
  }
</style>
