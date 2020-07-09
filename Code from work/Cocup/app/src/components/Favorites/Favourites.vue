<template>
  <v-container>
    <!-- <app-toolbar @filterUpdated="loadFeed"></app-toolbar> -->
    <v-layout
      justify-center
      align-center
      class="noData"
      v-if="!getFavorites()"
    >You have no favourite posts</v-layout>
    <v-layout class="home" v-else>
      <feed-item-info-dialog v-model="infoDialog"></feed-item-info-dialog>

      <div class="campaigns-wrapper">
        <feed-element
          v-for="(feedItem, key) in feedItems"
          :feedItemData="feedItem"
          :key="key"
          @click.native="openInfoDialog(feedItem)"
        ></feed-element>
      </div>

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
    </v-layout>
  </v-container>
</template>

<script>
import _ from "lodash";
import hello from "hellojs";
import Campaign from "@/components/Campaign/Campaign.vue";
import {
  jobCategories,
  jobTypes,
  locations,
  testFeedItems
} from "../Feed/config";
import FeedElement from "../Feed/FeedElement";
import FeedItemInfoDialog from "../Feed/FeedElementDialog";
import FilterMixin from "../../mixins/FeedFilter";
import { async } from "q";

export default {
  mixins: [FilterMixin],
  components: {
    Campaign,
    FeedElement,
    FeedItemInfoDialog
  },
  created() {
    this.getFavorites();
  },

  data: function() {
    return {
      jobCategories,
      jobTypes,
      locations,
      // activeMenu: 'home',
      snackbar: {
        active: false,
        text: "",
        color: "info",
        timeout: 5000
      },

      campaigns: [],
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
      }
    };
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
    getFavorites() {
      const self = this;
      this.$http.get("/v1/campaigns/favorites").then(resp => {
        self.feedItems = resp.data.payload;
      });
    },
    notify(text, color, timeout) {
      this.snackbar.text = text;
      if (color) this.snackbar.color = color;
      if (timeout) this.snackbar.timeout = timeout;

      this.snackbar.active = true;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/cocup-ui.scss";

.home {
  background-color: $color-gray-background;
  min-height: 90vh;
  padding-top: 10px;
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
</style>

