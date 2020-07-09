<template>
  <v-container>
    <app-toolbar-desktop class="hidden-xs-only"></app-toolbar-desktop>
    <v-flex class="hidden-sm-and-up profile-setup-industries"></v-flex>
    <v-layout
      align-center
      justify-center
      fill-height
      row
      wrap
      class="text-xs-center"
    >
      <v-flex xs12 sm12 md12 lg12 class="animated fadeIn mt-4 profile-setup-industries profile-setup-title">
        <div class="title">{{ currentPage.title }}</div>
      </v-flex>

      <!-- <v-flex xs12 sm12 md12 lg12 v-if="pageIndex === 0" class="animated fadeIn">
        <illustration></illustration>
      </v-flex> -->

      <v-flex xs12 sm7 md5 lg4 class="profile-setup-industries">
        <v-layout
          v-if="currentPage.categories"
          justify-center
          fill-height
          column
          style="height: 60%;"
          class="animated fadeIn mt-0"
        >
          <v-flex v-for="(item, index) in currentPage.categories" :key="index">
            <v-btn
              :outline="!isItemSelected(item)"
              @click="toggleItem(item)"
              color="#7d91ad"
              depressed
              class="profile-setup-options"
            >
              {{ item.name }}
              <v-icon v-if="isItemSelected(item)" small right>fas fa-check</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12></v-flex>

      <!-- BOTTOM NAV BUTTONS -->
      <v-flex xs12 sm12 md12 lg12 class="bottom-navigation text-xs-center">
        <div class="body mb-2">{{ currentPage.footer }}</div>
        <!-- Back buttons -->
        <v-btn fab color="grey" outline small class="text-xs-left" @click="onBackClicked">
          <v-icon>fas fa-angle-left</v-icon>
        </v-btn>

        <!-- Next buttons -->
        <v-btn
          color="success"
          round
          large
          @click="onNextClicked"
          :disabled="isLastPage && selected.length === 0"
        >{{ nextButtonLabel }}</v-btn>
        <!-- to="/profile/setup/industries" -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { jobCategories, categoryLists } from "./config";
import illustration from "./assets/ProfileSetupIndustriesSvg"
import AppToolbarDesktop from "../Core/AppToolbarDesktop"

export default {
  components: {
    illustration,
    AppToolbarDesktop
  },
  data() {
    return {
      pageIndex: 0,
      categoryLists,
      selected: []
    };
  },
  watch: {
    selected: function(newVal) {
      this.$store.commit("setStudentInfoTags", {
        key: "industries",
        value: newVal
      });
    }
  },
  computed: {
    currentPage: function() {
      return categoryLists[this.pageIndex];
    },
    isLastPage: function() {
      return this.pageIndex === categoryLists.length - 1;
    },
    nextButtonLabel: function() {
      // if (this.pageIndex === 0) {
      //   return "Ok";
      // }

      if (this.isLastPage) {
        return "Done!";
      }

      if (this.pageIndex >= 0) {
        return "Next";
      }
    }
  },
  methods: {
    isItemSelected(item) {
      return this.selected.some(e => e === item.id);
    },
    toggleItem(item) {
      if (!this.selected.some(e => e === item.id)) {
        // if the item is new
        this.selected.push(item.id);
      } else {
        // remove
        this.selected = this.selected.filter(e => e !== item.id);
      }
    },
    onNextClicked() {
      if (!this.isLastPage) {
        this.pageIndex++;
      } else {
        return this.$router.push("/");
      }
    },
    onBackClicked() {
      if (this.pageIndex === 0) {
        return this.$router.push("/profile/setup/languages");
      }

      this.pageIndex--;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

.theme--light.v-btn {
  color: white;
}

.container{
  margin-top: 40px;
  padding:0;
  max-width: unset;
}

.hidden-sm-and-up.profile-setup-industries{
  margin-top: -25px;
}

.flex.profile-setup-industries{
  padding: 0 16px;
}

.profile-setup-title.profile-setup-industries{
  padding: 0 16px;
}
</style>
