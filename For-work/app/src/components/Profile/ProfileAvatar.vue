<template>
  <v-badge v-bind:color="colorOfBadge" class="profile-avatar">
    <template v-slot:badge>{{progress}}%</template>
    <v-avatar @click=" $router.push('/profile') " v-ripple>
      <img
        v-if="$store.state.user && $store.state.user.studentInfo.profile && $store.state.user.studentInfo.profile.pictureUrl"
        :src="$store.state.user.studentInfo.profile.pictureUrl"
        alt="Avatar"
      />
      <v-icon v-else x-large color="grey">account_circle</v-icon>
    </v-avatar>
  </v-badge>
</template>


<script>
export default {
  data() {
    return {
      ui: {
        filterActive: false,
        isFeedbackDialogOpen: false
      }
    };
  },
  computed: {
    progress: function() {
      return this.$store.getters.getProfileCompletionProgress;
    },
    colorOfBadge: function() {
      if (this.progress <= 33) {
        return "__low";
      } else if (this.progress <= 66) {
        return "__medium";
      } else {
        return "__high";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-avatar {
  height: 35px !important;
  width: 35px !important;
  //Border to Users photo
  & img {
    border: 1px solid grey;
  }
  // when profile route is active
  &.active {
    box-shadow: 0 0 2px 2px #a91d1d;
  }
  .v-icon {
    font-size: 30px !important;
    color: #939393;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
}
.v-badge {
  z-index: 2;
}
</style>

<style lang="scss">
.profile-avatar {
  span.v-badge__badge {
    font-size: 8px;
    font-style: italic;
    text-align: center;
    line-height: 8px;
    position: absolute;
    top: 15px;
    right: -5px;
    width: 16px;
    height: 16px;

    &.__low {
      background-image: linear-gradient(#ff8566, #ff3300);
    }
    &.__medium {
      background-image: linear-gradient(#ffa64d, #ff8000);
    }
    &.__high {
      background-image: linear-gradient(#4dff4d, #009900);
    }
  }
}
</style>