<template>
  <div>
    <v-container class="coffee-item hidden-sm-and-up" @click="openCoffeeDialog" ripple>
      <v-layout>
        <v-flex xs2 class="logo">
          <img :src="data.description.logo" alt="Company Logo" />
        </v-flex>

        <v-flex xs10>
          <div class="content">
            <div
              class="subheading font-weight-medium grey--text text--darken-3 header text-truncate"
            >{{data.description.companyName}} wants to offer you coffee!</div>
            <div class="company">{{data.description.companyName}}</div>
            <div
              class="expires small grey--text mt-1"
              v-if="data.isValid"
            >Expires {{ getExpiresInText(data.expiresAt) }}</div>
            <div
              class="expires small grey--text mt-1"
              v-else
            >Expired {{ getExpiresInText(data.expiresAt) }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="coffee-item hidden-xs-only" @click="openCoffeeBox" ripple>
      <v-layout>
        <v-flex xs2 class="logo">
          <img :src="data.description.logo" alt="Company Logo" />
        </v-flex>

        <v-flex xs10>
          <div class="content">
            <div
              class="subheading font-weight-medium grey--text text--darken-3 header text-truncate"
            >{{data.description.companyName}} wants to offer you coffee!</div>
            <div class="company">{{data.description.companyName}}</div>
            <div
              class="expires small grey--text mt-1"
              v-if="data.isValid"
            >Expires {{ getExpiresInText(data.expiresAt) }}</div>
            <div
              class="expires small grey--text mt-1"
              v-else
            >Expired {{ getExpiresInText(data.expiresAt) }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["data"],
  created() {},
  methods: {
    getExpiresInText(date) {
      return moment(date).fromNow();
    },
    openCoffeeBox() {
      this.$root.$emit("setTokenId", this.data._id);
    },
    openCoffeeDialog() {
      this.$router.push({path: '/coffee-match/info/' , query: { tokenId: this.data._id}});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";
.coffee-item {
  //width: 92%;
  //max-width: 600px;
  background-color: white;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  color: $text-color;
  box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);

  .logo {
    display: flex;

    img {
      box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
      border-radius: 5px;
    }
  }
  .header {
    font-size: 14px;
    font-weight: 600;
  }
  .company {
    font-size: 11px;
    font-weight: 500;
  }
  .expires {
    font-size: 11px;
    font-weight: 400;
    font-style: italic;
  }
  &.hidden-sm-and-up.container {
    padding: 16px 8px;
    .logo {
      img {
        width: 40px;
        height: 40px;
      }
    }
    .header {
      font-size: 10px;
      font-weight: 600;
    }
    .company {
      font-size: 8px;
      font-weight: 500;
    }
    .expires {
      font-size: 8px;
      font-weight: 400;
      font-style: italic;
    }
  }

  &.hidden-xs-only {
    .logo {
      img {
        width: 56px;
        height: 56px;
      }
    }
  }
}
</style>

