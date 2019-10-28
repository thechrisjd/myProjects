<template>
  <div>
    <v-container class="hidden-sm-and-up post-navigation">
      <!--class: lighten-5-->
      <!-- List of posts -->
      <div class="campaigns-wrapper">
        <feed-element
          v-for="(feedItem, key) in feedItems"
          :feedItemData="feedItem"
          :key="key"
          @click.native="openInfoDialog(feedItem)"
        ></feed-element>
      </div>
      <div class="home">
        <!-- One info dialog for information popup window using dynamic data -->
        <feed-item-info-dialog v-model="infoDialog"></feed-item-info-dialog>
        <div class="subheading mx-5 mt-5">
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
    </v-container>
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-container class="lighten-5 hidden-xs-only feed-desktop">
      <!-- <v-layout align-center justify-end row wrap>
        <v-flex sm7>
          <filter-post-types></filter-post-types>
        </v-flex>
        <v-flex sm9>
          <search-field label="Search a job..."></search-field>
        </v-flex>
      </v-layout>-->
      <v-layout justify-space-between row wrap>
        <v-flex sm3 class="filters">
          <header>I’m looking for</header>
          <v-checkbox
            v-model="searchCriteria.jobTypes"
            v-for="(item, index) in jobTypes"
            v-bind:key="item.value"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:label="item.text"
            v-show="index < 4 || allJobTypesIsShown"
            v-bind:value="item.value"
            @change = "feedFilter()"
          ></v-checkbox>
          <div class="show-all">
            <a
              v-on:click="allJobTypesIsShown = !allJobTypesIsShown"
            >{{allJobTypesIsShown ? "Hide all" : "Show all"}}</a>
          </div>
          <header>I'm competent in</header>
          <v-checkbox
            v-model="searchCriteria.jobCategories"
            v-for="(item, index) in jobCategories"
            v-bind:key="item.value"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:label="item.text"
            v-show="index < 4 || allJobCategoriesIsShown"
            v-bind:value="item.value"
            @change = "feedFilter()"
          ></v-checkbox>
          <div class="show-all">
            <a
              v-on:click="allJobCategoriesIsShown = !allJobCategoriesIsShown"
            >{{allJobCategoriesIsShown ? "Hide all" : "Show all"}}</a>
          </div>
          <header>Job is located in</header>
          <!-- <search-field
            label="Location"
            :itemsForAutocomplete="itemsForAutocompleteLocation"
            v-model="searchCriteria.locations"
            @change = "feedFilter()"
          ></search-field> -->
          <v-checkbox
            v-model="searchCriteria.locations"
            v-for="(item, index) in locations"
            v-bind:key="item.value"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:label="item.text"
            v-show="index < 4 || allLocationsIsShown"
            v-bind:value="item.value"
          ></v-checkbox>
          <div class="show-all">
            <a v-on:click="allLocationsIsShown = !allLocationsIsShown">
              {{allLocationsIsShown ? "Hide all" : "Show all"}}</a>
          </div>
          <header>I speak</header>
          <v-checkbox
            v-model="searchCriteria.languages"
            v-for="(item, index) in languages"
            v-bind:key="item.value"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:label="item.text"
            v-show="index < 4 || allLanguagesIsShown"
            v-bind:value="item.value"
            @change = "feedFilter()"
          ></v-checkbox>
          <div class="show-all">
            <a v-on:click="allLanguagesIsShown = !allLanguagesIsShown">
              {{allLanguagesIsShown ? "Hide all" : "Show all"}}</a>
          </div>
        </v-flex>
        <v-flex>
          <!-- List of posts -->
          <div class="campaigns-wrapper">
            <feed-element
              v-for="(feedItem, key) in feedItems"
              :feedItemData="feedItem"
              :key="key"
              @click.native="openInfoDialog(feedItem)"
            ></feed-element>
          </div>
          <div class="home">
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
import { jobCategories, jobTypes, locations, languages } from "./config"; //testFeedItems
import FeedElement from "./FeedElement";
import FeedItemInfoDialog from "./FeedElementDialog";
import FilterMixin from "../../mixins/FeedFilter";
import EventBus from "../../eventBus";
import SearchField from "../Core/SearchField";
import AppToolbarDesktop from "../Core/AppToolbarDesktop";

export default {
  mixins: [FilterMixin],
  components: {
    FeedElement,
    FeedItemInfoDialog,
    SearchField,
    //FilterPostTypes,
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
        languages: [],
        jobTypes: [],
        jobCategories: [],
        locations: []
      },
      jobTypes,
      jobCategories,
      locations,
      languages,
      allJobTypesIsShown: false,
      allJobCategoriesIsShown: false,
      allLanguagesIsShown: false,
      allLocationsIsShown: false
    };
  },
  watch: {
    postTypes: function() {
      EventBus.$emit("FILTER_CHANGED", this.postTypes);
    }
  },
  created() {
    this.loadFeed();
    this.handleNotifications();

    // disable filter menu when click on the outside field
    window.addEventListener("click", this.disableFilterMenu);
  },
  computed: {
    // itemsForAutocompleteLocation: function() {
    //   return this.locations.map(x => x.text);
    // }
  },
  destroyed() {
    window.removeEventListener("click", this.disableFilterMenu);
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    // reload feed when filter changes
    EventBus.$on("FILTER_CHANGED", types => {
      this.loadFeed(types, true);
    });
  },
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
    loadFeed(postTypes, clearFeed = false) {
      // clear the feed and reload because the filter changed
      if (clearFeed) {
        this.hasNextPage = true;
        this.currentPage = 1;
        this.feedItems = [];
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // stop loading when out of campaigns
      if (!this.hasNextPage) {
        return;
      }

      const self = this;
      this.isLoading = true;

      let requestParams = {
        page: this.currentPage++
      };
      if (postTypes) requestParams.type = postTypes.join(",");

      this.$http
        .get("/v1/feed", {
          params: requestParams
        })
        .then(resp => {
          console.log(resp)
          if (resp.data) {
            // push new posts onto feed
            console.log('xx')
            self.feedItems = self.feedItems.concat(resp.data.payload);
            // set if there is more posts to load
            //self.hasNextPage = resp.data.payload.hasNextPage;
            self.hasNextPage = false;
          } else {
            self.notify(
              "Your feed could not be loaded, please try again.",
              "error"
            );
          }
          console.log(self.feedItems)
          self.isLoading = false;
        })
        .catch(err => {
          self.isLoading = false;
          console.log("Error", err);
          self.notify(
            "Something went wrong. Please check your connection and try again.",
            "error"
          );
        });
    },
    notify(text, color, timeout) {
      this.snackbar.text = text;
      if (color) this.snackbar.color = color;
      if (timeout) this.snackbar.timeout = timeout;

      this.snackbar.active = true;
    },
    handleScroll() {
      const scollPercentage = this.getScrollPercent();
      const targetPercentage = 80;
      if (scollPercentage > targetPercentage && !this.isLoading) {
        this.loadFeed();
      }
    },
    handleNotifications() {
      //let notificationDisplayed = false;

      if (this.$route.params.newUser === true) {
        console.log(
          "First login of the user who registered via",
          this.$route.params.signupType
        );
        this.notify(
          "Welcome! Your new account has been registered.",
          "success"
        );

        // route user to fill out their profile for the first time
        this.$router.push("/profile/setup");
        //notificationDisplayed = true;
      }
      if (this.$route.params.profileIntroSubmitted) {
        this.notify("Profile update successfully.", "success");
        //notificationDisplayed = true;
      }
      if (
        this.$route.params.isLogin &&
        this.$store.state.user.studentInfo.profile
      ) {
        const firstName = this.$store.state.user.studentInfo.profile.firstName;
        this.notify("Welcome back, " + firstName, "info", 2000);
      }
    },
    getScrollPercent() {
      var h = document.documentElement,
        b = document.body,
        st = "scrollTop",
        sh = "scrollHeight";
      return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    },
    disableFilterMenu(e) {
      const externalFieldClassName = "campaigns-wrapper";
      if (
        document
          .getElementsByClassName(externalFieldClassName)[0]
          .contains(e.target)
      ) {
        this.ui.filterActive = false;
      }
    },
    feedFilter() {

        let obj = {
          searchCriteria: this.searchCriteria
        }
        //console.log(obj)
        this.$http.post('/v1/feed/filter', obj)
            .then(res => {
              /*this.searchCriteria = res.data[0]*/
              let array = res.data.length
              let jobsArray = res.data.splice(1, array)
              //console.log(jobsArray)
              this.feedItems = jobsArray
            }).catch(err => {
              self.isLoading = false;
              console.log("Error", err);
              this.notify(
                "No jobs matching your request. Please change your filters.",
                "error"
              );
            });
    }

  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

.container.hidden-xs-only {
  margin-top: 100px;
  width: 960px;
  padding: 0;
  color: rgba(0, 0, 0, 0.54);

  .subheading {
    text-align: center;
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

<style lang="scss">
@import "../../assets/cocup-ui.scss";

.feed-desktop {
  &.container.hidden-xs-only {
    .v-input--selection-controls.v-input .v-label {
      font-size: 11px;
      margin-top: -2px;
    }
    .v-input--selection-controls {
      padding-top: 0;
    }
    .v-input--selection-controls__input {
      margin-right: 0;
    }
    .v-input--selection-controls.v-input.v-input--is-label-active {
      .v-icon {
        background-color: grey;
      }
    }
    .accent--text {
      color: #fff !important;
    }
    .top-align-checkbox {
      .v-icon {
        //font-size: 16px !important;
        width: 16px;
        height: 16px;
        background-color: #fff;
        color: #fff;
        border-radius: 3px;
        box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
      }

      .v-input__slot {
        align-items: flex-start;
        margin-bottom: 0;
      }

      &.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
        margin-bottom: 0px !important;
      }

      .v-messages {
        display: none;
      }
    }

    .v-autocomplete.v-input {
      max-width: 180px;

      .v-label {
        font-size: 11px !important;
      }
    }
  }
}

.filters {
  color: $text-color;
  font-size: 11px;
  font-weight: 500;

  header {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 600;
  }

  .show-all {
    margin: 0 0 30px 0;

    a {
      font-size: 11px;
      text-decoration: none;
      color: $text-color;
      opacity: 0.5;
    }
  }
}
</style>
<style lang="scss">

.container.post-navigation{
  padding-top: 40px;
}

</style>
