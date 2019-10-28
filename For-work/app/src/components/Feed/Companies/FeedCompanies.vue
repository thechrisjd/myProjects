<template>
  <div>
    <v-container class="hidden-sm-and-up post-navigation"><!--class: lighten-5-->
      <!-- List of posts -->
      <div class="campaigns-wrapper">
        <companies-element
            v-for="item in testCompany"   
            :feedCompaniesItemData="item"           
            v-bind:key="testCompany[item]"
            @click.native="openInfoDialog(item)"
          ></companies-element>
      </div>
      <div class="home">
        <!-- One info dialog for information popup window using dynamic data -->
        <!-- <feed-item-info-dialog v-model="infoDialog"></feed-item-info-dialog> -->
        <div class="subheading mx-5 mt-5">
          <!-- While feed is loading -->
          <div v-if="isLoading" class>Loading your career feed...</div>

          <!-- If feed loaded but there are no results -->
          <!-- <div v-if="!isLoading && feedItems.length === 0">
            Ops, no results found.
            <br />Please adjust your search criteria!
          </div> -->
        </div>

        <!-- Display while loading feed -->
        <v-layout justify-center>
          <v-flex xs1>
            <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
          </v-flex>
        </v-layout>
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
    </v-container>
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-container class="lighten-5 hidden-xs-only feed-desktop">
      <v-layout justify-space-between row wrap>
        <v-flex sm3 class="filters">
          <header>Company size</header>
          <v-checkbox
            v-model="searchCriteria.sizeOfTheCompany"
            v-for="(item, index) in sizeOfTheCompany"
            v-bind:key="item.value"
            v-show="index < 4 || allSizeIsShown"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:label="item.text"
            v-bind:value="item.value"
          ></v-checkbox>
          <div class="show-all">
            <a
              v-on:click="allSizeIsShown = !allSizeIsShown"
            >{{allSizeIsShown ? "Hide all" : "Show all"}}</a>
          </div>
          <header>Industry</header>
          <v-checkbox
            v-model="searchCriteria.industries"
            v-for="(item, index) in industries"
            v-bind:key="item.value"
            v-show="index < 4 || allIndustriesIsShown"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:label="item.name"
            v-bind:value="item.id"
          ></v-checkbox>
          <div class="show-all">
            <a
              v-on:click="allIndustriesIsShown = !allIndustriesIsShown"
            >{{allIndustriesIsShown ? "Hide all" : "Show all"}}</a>
          </div>
          <header>Company location</header>
          <!-- <search-field
            label="Location"
            :itemsForAutocomplete="itemsForAutocompleteLocation"
            v-model="searchCriteria.locations"
          ></search-field> -->
        </v-flex>
        <v-flex sm9>
          <!-- List of companies -->
         <div class="campaigns-wrapper">
            <companies-element
              @click.native="openInfoDialog(item)"
              v-for="item in testCompany"   
              :feedCompaniesItemData="item"           
              v-bind:key="testCompany[item]"
            ></companies-element>
          </div>
          <div class="home">
        <companies-element-dialog v-model="infoDialog"></companies-element-dialog>

            <div class="subheading mt-5">
              <!-- While feed is loading -->
              <div v-if="isLoading" class>Loading your career feed...</div>

              <!-- If feed loaded but there are no results -->
              <div v-if="!isLoading && feedItems.length === 0">
                Ops, no results found.
                <br />Please adjust your search criteria!
              </div>
            </div>

            <!-- Display while loading feed -->
            <v-layout justify-center>
              <v-flex xs1>
                <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
              </v-flex>
            </v-layout>
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
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
//import _ from "lodash";
//import hello from "hellojs";
// import Campaign from '@/components/Campaign/Campaign.vue'
import { locations, testCompany, sizeOfTheCompany } from "../config";
import { industries } from "../../Profile/config";
import CompaniesElement from "./CompaniesElement";
import CompaniesElementDialog from "./CompaniesElementDialog";
import FilterMixin from "../../../mixins/FeedFilter";
import EventBus from "../../../eventBus";
import SearchField from "../../Core/SearchField";
import AppToolbarDesktop from "../../Core/AppToolbarDesktop";

export default {
  mixins: [FilterMixin],
  components: {
    CompaniesElement,
    CompaniesElementDialog,
    SearchField,
    AppToolbarDesktop
  },
  data: function() {
    return {
      snackbar: {
        active: false,
        text: "",
        color: "info",
        timeout: 5000
      },
      feedItems: [],
      infoDialog: {
        active: false,
        item: null
      },
      isLoading: false,
      currentPage: 1,
      hasNextPage: true,
      ui: {
        drawer: false
      },
      searchCriteria: {
        locations: "",
        sizeOfTheCompany: [],
        industries: []
      },
      locations,
      testCompany,
      sizeOfTheCompany,
      industries,
      allSizeIsShown: false,
      allIndustriesIsShown: false
    };
  },
  watch: {
    postTypes: function(val) {
      console.log(val)
      EventBus.$emit("FILTER_CHANGED", this.postTypes);
    }
  },
  // created() {
  //   this.loadFeed();
  //   this.handleNotifications();     
  //   // disable filter menu when click on the outside field
  //   window.addEventListener("click", this.disableFilterMenu);
  // },
  // destroyed() {
  //   // window.removeEventListener("click", this.disableFilterMenu);
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
  // mounted() {
  //   window.addEventListener("scroll", this.handleScroll);

  //   // reload feed when filter changes
  //   EventBus.$on("FILTER_CHANGED", types => {
  //     this.loadFeed(types, true);
  //   });
  // },
  methods: {
    openInfoDialog(feedItem) {
      if (!feedItem) {
        return alert("Sorry, we could not find the details for this item...");
      }
      this.infoDialog = {
        active: true,
        item: feedItem
      };
    },
    // loadFeed(postTypes, clearFeed = false) {
    //   // clear the feed and reload because the filter changed
    //   if (clearFeed) {
    //     this.hasNextPage = true;
    //     this.currentPage = 1;
    //     this.feedItems = [];
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    //   }

    //   // stop loading when out of campaigns
    //   if (!this.hasNextPage) {
    //     return;
    //   }

    //   const self = this;
    //   this.isLoading = true;

    //   let requestParams = {
    //     page: this.currentPage++
    //   };
    //   if (postTypes) requestParams.type = postTypes.join(",");

    //   self.feedItems = this.feedItems;
    //   // this.$http
    //   //   .get("/v1/feed", {
    //   //     params: requestParams
    //   //   })
    //   //   .then(resp => {
    //   //     if (resp.data.payload) {
    //   //       // push new posts onto feed
    //   //       self.feedItems = self.feedItems.concat(resp.data.payload.docs);
    //   //       // set if there is more posts to load
    //   //       self.hasNextPage = resp.data.payload.hasNextPage;
    //   //     } else {
    //   //       self.notify(
    //   //         "Your feed could not be loaded, please try again.",
    //   //         "error"
    //   //       );
    //   //     }
    //   //     self.isLoading = false;
    //   //   })
    //   //   .catch(err => {
    //   //     self.isLoading = false;
    //   //     console.log("Error", err);
    //   //     self.notify(
    //   //       "Something went wrong. Please check your connection and try again.",
    //   //       "error"
    //   //     );
    //   //   });
    // },
    // notify(text, color, timeout) {
    //   this.snackbar.text = text;
    //   if (color) this.snackbar.color = color;
    //   if (timeout) this.snackbar.timeout = timeout;

    //   this.snackbar.active = true;
    // },
    // handleScroll() {
    //   const scollPercentage = this.getScrollPercent();
    //   const targetPercentage = 80;
    //   if (scollPercentage > targetPercentage && !this.isLoading) {
    //     this.loadFeed();
    //   }
    // },
    // handleNotifications() {
    //   //let notificationDisplayed = false;

    //   if (this.$route.params.newUser === true) {
    //     console.log(
    //       "First login of the user who registered via",
    //       this.$route.params.signupType
    //     );
    //     this.notify(
    //       "Welcome! Your new account has been registered.",
    //       "success"
    //     );

    //     // route user to fill out their profile for the first time
    //     this.$router.push("/profile/setup");
    //     //notificationDisplayed = true;
    //   }
    //   if (this.$route.params.profileIntroSubmitted) {
    //     this.notify("Profile update successfully.", "success");
    //     //notificationDisplayed = true;
    //   }
    //   if (this.$route.params.isLogin) {
    //     const firstName = this.$store.state.user.studentInfo.profile.firstName;
    //     this.notify("Welcome back, " + firstName, "info", 2000);
    //   }
    // },
    // getScrollPercent() {
    //   var h = document.documentElement,
    //     b = document.body,
    //     st = "scrollTop",
    //     sh = "scrollHeight";
    //   return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    // },
    // disableFilterMenu(e) {
    //   const externalFieldClassName = "campaigns-wrapper";
    //   if (
    //     document
    //       .getElementsByClassName(externalFieldClassName)[0]
    //       .contains(e.target)
    //   ) {
    //     this.ui.filterActive = false;
    //   }
    // }
 }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/cocup-ui.scss";
.container.hidden-xs-only {
  margin-top: 100px;
  width: 960px;
  padding: 0;
  color: rgba(0, 0, 0, 0.54);

  .subheading {
    text-align: center;
  }

  .campaigns-wrapper{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}

.home {
  background-color: $color-gray-background;
  min-height: 90vh;
  padding-top: 30px;
}

.image-loading {
  display: flex;
  flex-wrap: wrap;

  img {
    margin: 20% auto 0 auto;
    width: 70%;
    height: 100%;
  }

  .loading-text {
    margin: auto;
    margin-top: 10%;
  }
}

.toolbar-wrapper .filter-content {
  position: absolute;
  top: 15%;
  left: 3%;
  width: 90%;
  height: 75vh;
  overflow: scroll;

  ul {
    list-style-type: none;
  }
}

.v-autocomplete.v-input {
  max-width: unset;
}
</style>