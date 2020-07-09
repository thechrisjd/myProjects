<template>
  <v-container class="page-container">
    <app-toolbar-desktop v-if="!$store.ismobile"></app-toolbar-desktop>
    <div class="page-wrapper">
      <!-- VIEW SECTION -->
      <div v-if="!editor.active" class="animated fadeInLeft faster" id="view-section">
        <v-layout row wrap>
          <v-flex xs12 sm4 class="main-information">
            <profile-photo></profile-photo>
            <v-flex class="profile-name">
              {{ $store.state.studentInfo.profile.firstName + ' ' + $store.state.studentInfo.profile.lastName }}
              <v-btn flat icon @click="onEditing('EditAccount')" class="edit-button">
                <v-icon small>edit</v-icon>
              </v-btn>
            </v-flex>

            <v-divider></v-divider>

            <v-flex class="view-section" v-for="(item, index) in profileSections" :key="index">
              <profile-preview-section
                v-if="item.title === 'Locations'"
                @editing="onEditing"
                :content="item"
                v-bind:style="{ 'background-image' : 'url(' + require('../../assets/icons/location-transparent.svg') + ')', 
                              'background-size' : '20px',
                              'background-position' : '0 -18px' }"
              ></profile-preview-section>
              <profile-preview-section
                v-if="item.title === 'Industries'"
                @editing="onEditing"
                :content="item"
                v-bind:style="{ 'background-image' : 'url(' + require('../../assets/icons/industry-transparent.svg') + ')', 
                              'background-size' : '20px',
                              'background-position' : '0 5px' }"
              ></profile-preview-section>
              <profile-preview-section
                v-if="item.title === 'Looking for'"
                @editing="onEditing"
                :content="item"
              ></profile-preview-section>
              <profile-preview-section
                v-if="item.title === 'Languages'"
                @editing="onEditing"
                :content="item"
                v-bind:style="{ 'background-image' : 'url(' + require('../../assets/icons/globe-transparent.svg') + ')', 
                              'background-size' : '50px',
                              'background-position' : '-14px -23px' }"
              ></profile-preview-section>
            </v-flex>
            <v-flex v-if="$store.state.studentInfo.portfolio.lenght !== 0">
              <div class="profile-header">
                <div>Find me on</div>
                <v-btn flat icon @click="onEditing('EditPortfolio')" class="edit-button">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </div>
              <div
                class="website links"
                v-if="$store.state.studentInfo.portfolio.website"
              >{{ $store.state.studentInfo.portfolio.website }}</div>
              <div
                class="github links"
                v-if="$store.state.studentInfo.portfolio.githubUsername"
              >{{ $store.state.studentInfo.portfolio.githubUsername }}</div>
              <div
                class="linkedin links"
                v-if="$store.state.studentInfo.portfolio.linkedinProfile"
              >{{ $store.state.studentInfo.portfolio.linkedinProfile }}</div>
            </v-flex>

            <v-flex>
              <div class="profile-header">
                <div>Contact</div>
                <v-btn flat icon @click="onEditing('EditContacts')" class="edit-button">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </div>
              <div class="links contact">{{ this.$store.state.user.email }}</div>
              <div class="links contact">{{ $store.state.studentInfo.profile.mobile }}</div>
            </v-flex>
          </v-flex>
          <v-divider vertical></v-divider>

          <v-flex xs12 sm7 class="additional-information">
            <v-flex class="mb-3">
              <div class="profile-header">
                <div>About me</div>
                <v-btn flat icon @click="onEditing('EditAboutMe')" class="edit-button">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </div>
              <div class="contact">{{ $store.state.studentInfo.profile.about }}</div>
            </v-flex>

            <v-flex v-for="(item, index) in profileSections" :key="index">
              <profile-preview-section
                v-if="item.title === 'Skills'"
                @editing="onEditing"
                :content="item"
                class="profile-header skills"
              ></profile-preview-section>
            </v-flex>
            <profile-preview-section-main @editing="onEditing"></profile-preview-section-main>
          </v-flex>
        </v-layout>
      </div>

      <!-- <div class="top-background-sheet"></div> -->
      <!-- <profile-header></profile-header> -->
      <!-- VIEW SECTION -->
      <!-- <div v-if="!editor.active" class="animated fadeInLeft faster " id="view-section"> -->
      <!--<profile-preview-section-main @editing="onEditing"></profile-preview-section-main>

      <v-layout column wrap class="mt-3">
        <v-flex xs12 class="mb-5 view-section" v-for="(item, index) in profileSections" :key="index">
          <profile-preview-section @editing="onEditing" :content="item"></profile-preview-section>
        </v-flex>
        <v-flex>
          <log-out></log-out>
          <v-btn round outline to="/">
            <v-icon left small>fas fa-angle-left</v-icon>Back
          </v-btn>
        </v-flex>
      </v-layout>
      </div>-->

      <!-- EDIT SECTION -->
      <profile-editor
        v-if="editor.active"
        :componentId="editor.componentId"
        @closeEditor="closeEditor"
        class="animated fadeInRight faster"
      ></profile-editor>
      <v-btn
        v-if="editor.active"
        color="success"
        depressed
        block
        class="hidden-sm-and-up done-button animated slideInUp faster"
        @click="closeEditor"
      >Done</v-btn>
      <v-btn
        v-if="editor.active"
        color="success"
        depressed
        block
        class="hidden-xs-only done-button animated slideInUp faster"
        @click="closeEditor"
      >Done</v-btn>
    </div>
    <log-out></log-out>
  </v-container>
</template>

<script>
import ProfilePhoto from "./ProfilePhoto";
import AppToolbarDesktop from "../Core/AppToolbarDesktop";
import ProfileEditor from "./ProfileEditor";
import ProfilePreviewSection from "./ProfilePreviewSection";
import ProfilePreviewSectionMain from "./ProfilePreviewSectionMain";
import LogOut from "./LogOut";
import { profileSections } from "./config";
import menuBarSharedStore from "../Core/SharedState";

export default {
  //mixins: [UserServiceMixin],
  components: {
    ProfilePhoto,
    AppToolbarDesktop,
    ProfilePreviewSection,
    ProfilePreviewSectionMain,
    ProfileEditor,
    LogOut
  },
  data() {
    return {
      profileSections,
      lastScrollPositionPx: 0,
      editor: {
        active: false,
        componentId: ""
      }
    };
  },
  created() {
    console.log(this.$store.state.studentInfo);
  },
  watch: {
    "editor.active": function(newVal) {
      menuBarSharedStore.menuBarVisible = !newVal;
    }
  },
  methods: {
    onEditing(componentId) {
      this.editor.componentId = componentId;
      // save last scroll position to restore
      this.lastScrollPositionPx = document.documentElement.scrollTop;

      // animate smoothly elements when opening editor window
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      document.getElementById("view-section").classList.add("fadeOutLeft");
      const self = this;
      setTimeout(() => {
        self.editor.active = true;
      }, 400);
    },
    closeEditor() {
      this.editor.active = false;

      // restore last scroll position and animate closing editor
      const self = this;
      setTimeout(() => {
        window.scrollTo({
          top: self.lastScrollPositionPx,
          left: 0,
          behavior: "smooth"
        });
      }, 10);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

.page-container {
  margin-top: 70px;
  max-width: unset !important;
  padding-left: 0;
  padding-right: 0;

  .page-wrapper {
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
    width: 816px;
    margin: 0 auto;
    padding: 20px;
    color: $profile-main-color;

    .profile-name {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      display: flex;
      justify-content: space-between;
      padding: 0 10px 0 30px;
      margin: 10px 0;
    }

    .profile-header {
      font-size: 22px;
      font-weight: bold;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px 0 30px;
    }

    .links {
      color: $profile-third-color;
      font-size: 13px;

      &.contact {
        margin-left: 30px;
      }
    }

    .website {
      padding-left: 30px;
      margin-bottom: 5px;
      background: url("../../assets/icons/globe-transparent.svg") no-repeat;
      background-size: 92px 89px;
      background-position: -34px -25px;
    }

    .github {
      padding-left: 30px;
      margin-bottom: 5px;
      background: url("../../assets/icons/github.svg") no-repeat;
      background-size: 18px 20px;
      background-position: 2px 0px;
    }

    .linkedin {
      padding-left: 30px;
      margin-bottom: 5px;
      background: url("../../assets/icons/linkedin.svg") no-repeat;
      background-size: 47px 47px;
      background-position: -10px -10px;
    }

    .additional-information {
      padding-left: 25px;

      .profile-header {
        padding-left: 0;

        &.skills {
          display: unset;
          justify-content: unset;
        }
      }
      
    }
  }

  // .top-background-sheet {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 120px;
  //   background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
  // }
}

.done-button {
  position: fixed;
  bottom: 1%;

  &.hidden-sm-and-up {
    left: 4%;
    width: 92%;
  }
  &.hidden-xs-only {
    left: 24%;
    width: 52%;
  }
}

.view-section {
  //border: 1px solid darkgrey;
  //background-color: lightgrey;
  //padding: 10px;
}
</style>


<style lang="scss">
.edit-button {
  width: unset !important;
  height: unset !important;
  margin: 0 !important;
  color: #b4b8c0 !important;
}
</style>