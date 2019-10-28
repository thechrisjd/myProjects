<template>
  <div>
  <v-container class="hidden-sm-and-up">
    <!-- <pull-to :top-load-method="onPullRefresh" :top-config="pullToRefreshConfig" :is-bottom-bounce="false"> -->
    <v-layout row wrap align-start>
      <v-flex xs12 v-if="loading">
        <v-progress-circular class="progress-circle" indeterminate color="red"></v-progress-circular>
      </v-flex>
      <v-flex xs12 v-if="$store.getters.getCoffeeTokens.total.length > 0">
        <div class="heading">Coffee Tickets</div>
        <div class="subheading font-weight-medium mb-2">New tickets</div>
        <coffee-list-element
          v-for="(coffeeToken, key) in sortedActiveTokens"
          :data="coffeeToken"
          :key="key"
        ></coffee-list-element>

        <div class="subheading font-weight-medium mb-2 mt-4">Redeemed Tickets</div>
        <coffee-list-element
          v-for="(coffeeToken, key) in sortedOldTokens"
          :data="coffeeToken"
          :key=" 'old-' + key"
        ></coffee-list-element>
      </v-flex>
      <v-flex xs12 v-else>
        <coffee-list-empty-profile v-if="$store.getters.isProfileEmpty"></coffee-list-empty-profile>
        <coffee-list-empty v-if="$store.getters.isStoreEmpty"></coffee-list-empty>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="share-box" :class="{ 'hide-box-text' : !showShareBox }">
        <v-btn class="arrow-down" icon @click="showShareBox = !showShareBox">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <div class="box-text">
          <p>Share with 3 friends and get a free coffee ticket!</p>
          <v-btn class="share-button" @click="clickOnTheButton">SHARE</v-btn>
        </div>
      </v-flex>
  </v-container>
  <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
  <v-container class="hidden-xs-only coffee-list">    
    <v-layout row wrap justify-center>
      <v-flex xs12 v-if="loading">
        <v-progress-circular class="progress-circle" indeterminate color="red"></v-progress-circular>
      </v-flex>

      <v-flex xs8 class="share-box">
        <p>Share with 3 friends and get a free coffee ticket!</p>
        <v-btn class="share-button" @click="clickOnTheButton">SHARE THE LINK</v-btn>
        <a>{{referenceLink}}</a>
      </v-flex>

      <v-flex xs12>
        <v-divider class="horizontal"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout v-if="$store.getters.getCoffeeTokens.total.length">
      <v-flex xs7>
        <coffee-list-element
          v-for="(coffeeToken, key) in sortedActiveTokens"
          :data="coffeeToken"
          :key="key"
        ></coffee-list-element>
        <coffee-list-element
          v-for="(coffeeToken, key) in sortedOldTokens"
          :data="coffeeToken"
          :key=" 'old-' + key"
        ></coffee-list-element>
      </v-flex>
      <v-divider vertical class="vertical"></v-divider>
      <v-flex xs5>
        <token-info v-if="tokenId" :tokenId="tokenId"></token-info>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <coffee-list-empty-profile v-if="$store.getters.isProfileEmpty"></coffee-list-empty-profile>
      <coffee-list-empty v-if="$store.getters.isStoreEmpty"></coffee-list-empty>
    </v-layout>
  </v-container>
      </div>
</template>

<script>
import moment from "moment";
//import PullTo from "vue-pull-to";
import CoffeeListElement from "./CoffeeListElement.vue";
import TokenService from "../../mixins/TokenService.js";
import CoffeeListEmptyProfile from "./CoffeeListEmptyProfile.vue";
import CoffeeListEmpty from "./CoffeeListEmpty.vue";
import AppToolbarDesktop from "../Core/AppToolbarDesktop";
import TokenInfo from "./TokenInfo.vue";
//import { EventBus } from '../Campaign/eventBus';

const pullToRefreshConfig = {
  pullText: "Pull to refresh...", // The text is displayed when you pull down
  triggerText: "Release to refresh", // The text that appears when the trigger distance is pulled down
  loadingText: "Loading...", // The text in the load
  doneText: "Up to date!", // Load the finished text
  failText: "Failed to load", // Load failed text
  loadedStayTime: 400, // Time to stay after loading ms
  stayDistance: 50, // Trigger the distance after the refresh
  triggerDistance: 70 // Pull down the trigger to trigger the distance
};

export default {
  mixins: [TokenService],
  components: {
    //PullTo,
    CoffeeListElement,
    CoffeeListEmpty,
    CoffeeListEmptyProfile,
    AppToolbarDesktop,
    TokenInfo
  },
  created() {
    const self = this;
    this.$root.$on("setTokenId", id => {
      self.tokenId = id;
    });
    if (!self.tokenId) {
      if (self.$store.getters.getCoffeeTokens.activeTokens.length > 0) {
        self.tokenId = self.$store.getters.getCoffeeTokens.activeTokens[0]._id;
      } else if (self.$store.getters.getCoffeeTokens.oldTokens.length > 0) {
        self.tokenId = self.$store.getters.oldTokens.activeTokens[0]._id;
      }
    }
  },
  data() {
    return {
      dialog: {
        active: false,
        token: {}
      },
      loading: false,
      pullToRefreshConfig,
      tokenId: null,
      showShareBox: true
    };
  },
  computed: {
    referenceLink: function() {
      return `${location.origin}/${
        this.$router.resolve({
          path: "/form",
          query: { ref: this.$store.state.user.referralCode }
        }).href
      }`;
    },
    sortedActiveTokens: function() {
      return this.$store.getters.getCoffeeTokens.activeTokens.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
    },
    sortedOldTokens: function() {
      return this.$store.getters.getCoffeeTokens.oldTokens.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
    }
  },
  methods: {
    getTimeFromNow(date) {
      return "Expires " + moment(date).fromNow();
    },
    async onPullRefresh(callback) {
      await this.loadTokensFromServer();
      callback("done");
    },
    clickOnTheButton() {
      this.copy();
    },
    copy() {
      this.copyToClipboard(this.referenceLink);
    },
    copyToClipboard(val) {
      const el = document.createElement("textarea");
      el.value = val;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }
};
</script>



<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

// .cocup-pale-background {
//   background: rgb(136, 200, 142);
//   background: linear-gradient(
//     151deg,
//     rgba(136, 200, 142, 1) 0%,
//     rgba(202, 165, 147, 1) 82%,
//     rgba(241, 148, 151, 1) 100%
//   );
// }

// .capitalize {
//   text-transform: capitalize;
// }

.progress-circle {
  margin-left: 45%;
  margin-top: 30%;
}

// .pull-down-header {
//   background-color: transparent;
// }

.hidden-sm-and-up {
  color: $text-color;
  min-height: 100vh;
  position: relative;
  .heading {
    font-size: 20px;
    font-weight: 700;
  }
  .subheading {
    font-size: 10px !important;
  }
  .share-box {
    position: absolute;
    bottom: 50px;
    min-width: 100vw;
    max-height: 120px;
    transition: max-height 0.5s;
    text-align: center;
    background-color: $color-gray-background;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
    color: $text-color;
    padding: 15px 32px;
    margin-left: -16px;
    box-shadow: 0px -2px 4px 1px rgb(180, 179, 180);

    .arrow-down {
      position: absolute;
      top: -10px;
      right: -10px;
      transform: rotate(-90deg);
      color: $text-color;
    }

    &.hide-box-text {
      max-height: 40px;

      .arrow-down {
        transform: rotate(90deg);
        top: 0;
      }
    }

    .box-text {
      background-color: $text-color-light;
      border-radius: 5px;
      padding: 5px 0;

      p {
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 0;
      }
      .share-button {
        color: #ffffff;
        padding-left: 25px;
        background: $color-2 url(../../assets/icons/share-arrow.svg) left -1px no-repeat;
        font-size: 11px;
        font-weight: 600;
        border-radius: 5px;
      }
    }
  }
}

.hidden-xs-only.coffee-list {
  margin: 100px auto 0;
  width: 960px;
  padding-left: none;

  .share-box {
    text-align: center;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
    color: $text-color;
    padding: 10px 10px;

    p {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 0;
    }
    .share-button {
      color: #ffffff;
      background-color: $color-2;
      font-size: 20px;
      font-weight: 600;
      border-radius: 5px;
    }
    a {
      font-size: 14px;
      color: $text-color;
    }
  }

  .horizontal {
    margin: 50px 0;
  }
  .vertical {
    margin: 0 25px;
  }
}
</style>
