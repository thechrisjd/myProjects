<template>
  <div>
    <v-container class="hidden-sm-and-up post-navigation">
      <!-- List of events -->
      <div class="campaigns-wrapper">
        <feed-events-element
          @click.native="openInfoDialog(item)"
          v-for="item in feedItems"
          :feedEventsItemData="item"
          v-bind:key="feedItems[item]"
        ></feed-events-element>
      </div>
      <div class="home">
        <!-- One info dialog for information popup window using dynamic data -->
        <!-- <feed-events-element-dialog v-model="infoDialog"></feed-events-element-dialog> -->
        <div class="subheading mx-5 mt-5"></div>
          <!-- While feed is loading -->
          <div v-if="isLoading" class>Loading your career feed...</div>

          <!-- If feed loaded but there are no results -->
          <div v-if="!isLoading && feedItems.length === 0">
            Ops, no results found.
            <br />Please adjust your search criteria!
          </div>
          <div class="home">
            <feed-events-element-dialog v-model="infoDialog"></feed-events-element-dialog>
            <div class="subheading mt-5">
              <!-- While feed is loading -->
              <div v-if="isLoading" class>Loading your career feed...</div>

              <!-- If feed loaded but there are no results -->
              <div v-if="!isLoading && feedItems.length === 0">
                Ops, no results found.
                <br />Please adjust your search criteria!
              </div>
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
        <!-- </v-flex>
      </v-layout> -->
    </v-container>
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-container class="lighten-5 hidden-xs-only feed-desktop" v-if="!$store.ismobile">
      <v-layout justify-space-between row wrap>
        <v-flex sm3 class="filters">
          <header>Date</header>
          <v-checkbox
            v-model="searchCriteria.date"
            v-for="item in testDate"
            v-bind:key="item.value"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:value="item.text"
            v-bind:label="item.value"
            @change = "feedFilter()"
          ></v-checkbox>
          <div class="show-all">
            <!-- <a
              v-on:click="allJobTypesIsShown = !allJobTypesIsShown"
            >{{allJobTypesIsShown ? "Hide all" : "Show all"}}</a> -->
          </div>
          <header>Price</header>
          <v-checkbox
            v-model="searchCriteria.price"
            v-for="item in price"
            v-bind:key="item.value"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:value="item.text"
            v-bind:label="item.value"
            @change = "feedFilter()"
          ></v-checkbox>
          <div class="show-all">
            <!-- <a
              v-on:click="allJobCategoriesIsShown = !allJobCategoriesIsShown"
            >{{allJobCategoriesIsShown ? "Hide all" : "Show all"}}</a> -->
          </div>
          <header>Job is located in</header>
          <v-checkbox
            v-model="searchCriteria.locations"
            v-for="(item, index) in locations"
            v-bind:key="item.value"
            class="mb-0 mt-0 top-align-checkbox"
            v-bind:label="item.text"
            v-show="index < 4 || allLocationsIsShown"
            v-bind:value="item.value"
            @change = "feedFilter()"
          ></v-checkbox>
          <div class="show-all">
            <a v-on:click="allLocationsIsShown = !allLocationsIsShown">
              {{allLocationsIsShown ? "Hide all" : "Show all"}}</a>
          </div>
        </v-flex>
        <v-flex>
          <!-- List of events -->
         <div class="campaigns-wrapper"> <!-- :feedItemData="feedItem" -->
            <feed-events-element
              @click.native="openInfoDialog(item)"
              v-for="item in feedItems"
              :feedEventsItemData="item"
              v-bind:key="feedItems[item]"
            ></feed-events-element>
          </div>
          <div class="home">
            <feed-events-element-dialog v-model="infoDialog"></feed-events-element-dialog>
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
import { locations, testDate, price, testEvent, daysOfTheWeek } from "./config";
import FeedEventsElement from "./FeedEventsElement";
import FeedEventsElementDialog from "./FeedEventsElementDialog";
import FilterMixin from "../../mixins/FeedFilter";
import EventBus from "../../eventBus";
import SearchField from "../Core/SearchField";
import AppToolbarDesktop from "../Core/AppToolbarDesktop";


export default {
  mixins: [FilterMixin],
  components: {
    FeedEventsElement,
    FeedEventsElementDialog,
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
        locations: [],
        date: [],
        price: ""
      },
      locations,
      testDate,
      price,
      testEvent,
      daysOfTheWeek,
      allLocationsIsShown: false
    };
  },
  watch: {
    postTypes: function(val) {
      console.log(val)
      EventBus.$emit("FILTER_CHANGED", this.postTypes);
    }
  },
  created() {
  this.loadFeed();
  //this.handleNotifications();
  // disable filter menu when click on the outside field
  window.addEventListener("click", this.disableFilterMenu);
  },
  // computed: {
  //   itemsForAutocompleteLocation: function() {
  //     return this.locations.map(x => x.text);
  //   }
  // },
  destroyed() {
   // window.removeEventListener("click", this.disableFilterMenu);
  window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
  window.addEventListener("scroll", this.handleScroll);

  //   // reload feed when filter changes
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
       /*if (clearFeed) {
         this.hasNextPage = true;
         this.currentPage = 1;
         this.feedItems = [];
         window.scrollTo({ top: 0, behavior: "smooth" });
       }*/

       // stop loading when out of campaigns
       /*if (!this.hasNextPage) {
         return;
       }*/

       const self = this;
       this.isLoading = true;

       self.feedItems = this.feedItems;
       this.$http
        .get("/v1/feed/event", {})
        .then(resp => {
          //console.log(resp)
          if (resp.data) {
            // push new posts onto feed
            self.feedItems = self.feedItems.concat(resp.data);
          } else {
            self.notify(
              "Your feed could not be loaded, please try again.",
              "error"
            );
          }
          //console.log(self.feedItems)
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
     feedFilter() {
          //console.log('xx');
         let obj = {
           searchCriteria: this.searchCriteria
         }
         console.log(obj)
         /*Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(),0,1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
          }

          var today = new Date();
          var weekNumber = today.getWeek();
          console.log(weekNumber);*/
         this.$http.post('/v1/feed/filterEvent', obj)
             .then(res => {
               //this.searchCriteria = res.data[0]
               let array = res.data
               //let jobsArray = res.data.splice(1, array)
               console.log(array)
               this.feedItems = array
             }).catch(err => {
               self.isLoading = false;
               console.log("Error", err);
               /*this.notify(
                 "No events matching your request. Please change your filters.",
                 "error"
               );*/
             });
     },
     //handleScroll() {
    //  const scollPercentage = this.getScrollPercent();
    //  const targetPercentage = 80;
    //  if (scollPercentage > targetPercentage && !this.isLoading) {
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
@import "../../assets/cocup-ui.scss";

.campaigns-wrapper {
  width : 45em;
}

.container.hidden-xs-only {
  margin-top: 100px;
  width: 900px;
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
