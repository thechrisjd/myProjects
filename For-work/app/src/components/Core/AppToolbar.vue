<template>
  <div class="toolbar-wrapper hidden-sm-and-up"
    :hidden="$route.path === '/profile' ||
    $route.path === '/coffee'"
    ref="toolbar">
    <v-toolbar
      v-touch:swipe.top="swipeHandler"
      color="white"
      height="50px"
      class="cocup-toolbar"
      :class="{'filter-active': ui.filterActive}"
      fixed
      dense
      flat
    >
      <div class="visible-content">
        <!-- <profile-avatar></profile-avatar> -->
        <search-field label="Search for a job..." class="mobile-search"></search-field>
        <!-- Right Menu Button for Home -->
        <!-- <v-btn
          icon
          class="menu-button"
          @click="ui.filterActive = !ui.filterActive"
          v-if="$route.path === '/' "
        >
          <v-icon class="app-toolbar-filter">fas fa-sliders-h</v-icon>
        </v-btn> -->

        <!-- Right Menu Button for other components -->
        <!-- <v-btn icon v-else @click="ui.isFeedbackDialogOpen = !ui.isFeedbackDialogOpen">
          <v-icon class="app-toolbar-filter">far fa-lightbulb</v-icon>
        </v-btn> -->
      </div>

      <filter-menu v-model="ui.filterActive" @close="ui.filterActive = false"></filter-menu>

      <feedback-dialog v-model="ui.isFeedbackDialogOpen"></feedback-dialog>
    </v-toolbar>
  </div>
</template>

<script>
import FilterMenu from "../Feed/FeedFilter";
import FilterMixin from "../../mixins/FeedFilter";
import FeedbackDialog from "../Services/Feedback";
import ProfileAvatar from "../Profile/ProfileAvatar";
import SearchField from "./SearchField";

export default {
  mixins: [FilterMixin],
  components: {
    FilterMenu,
    FeedbackDialog,
    ProfileAvatar,
    SearchField
  },
  data() {
    return {
      ui: {
        filterActive: false,
        isFeedbackDialogOpen: false
      }
      // ,
      // components: ["Autocompletes", "Comboboxes", "Forms", "Inputs"]
    }
  },
  watch: {
    isFilterActive: function(value) {
      if (value) {
        document.querySelector("html").classList.add("noscroll");
      } else {
        document.querySelector("html").classList.remove("noscroll");
      }
    }
  },
  mounted: function() {
    const self = this;

    self.$root.$on("rootclick", function(event) {
      if (self.ui.filterActive && !self.$refs.toolbar.contains(event.target)) {
        self.ui.filterActive = false;
      }
    });
  },
  computed: {
    isFilterActive: function() {
      return this.ui.filterActive;
    }
  },
  methods: {
    swipeHandler: function() {
      this.ui.filterActive = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

.toolbar-wrapper {
  min-height: 50px;
  width: 100%;
  background-color: $color-gray-background;

  .cocup-toolbar {
    //border-bottom-right-radius: 15px !important;
    //border-bottom-left-radius: 15px !important;
    width: 100vw;
    min-height: 50px;
    transition: min-height 0.2s linear;

    &.filter-active {
      min-height: calc(100vh - 56px - 5%);
    }

    .v-toolbar__content {
      display: block;

      &::before {
        content: "";
        height: 45px;
        position: absolute;
        top: 0;
        right: 10px;
        left: 10px;
        background-color: white;
        z-index: 1;
      }

      .visible-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 100%;
        height: 50px;
      }

      .v-btn--icon {
        margin: 6px 0;
      }
    }
  }

  .v-btn {
    z-index: 2;
    .v-icon {
      &.app-toolbar-filter {
        font-size: 20px;
        color: $color-5;
      }
    }
  }
}
</style>

<style lang="scss">
@import "../../assets/cocup-ui.scss";
.toolbar-wrapper .v-toolbar__content{
  padding: 0 8px;
}

.v-autocomplete.v-input.mobile-search {
  // max-width: 300px;
  // min-width: 150px;
  // padding-top: 8px;
  // z-index: 1;

  label{
    left: 35px !important;
    font-size: 12px;
  }

  &.v-text-field input {
    padding: 5px 16px;
    font-size: 13px;
    color: $text-color;
  }

  .v-icon.v-icon.v-icon--link{
    //display: none;
  }

  .v-input__control .v-input__slot {
    //z-index: 1;
    //background-color: #f1f1f1;
    //border-radius: 3px;

    &:before,
    &:after{
      border-style: none;
    }

    .v-select__slot{
      padding-left: 20px;
      background: url('../../assets/toolbar/Search.svg') 10px 5px no-repeat;
      border: 1px solid $color-6;
    }
  }
}
</style>
