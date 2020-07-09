<template>
  <v-bottom-nav :active.sync="menu" :value="sharedState.menuBarVisible" fixed color="white" app  class="hidden-sm-and-up menu-navigation">
    <v-btn flat to="/" >
      <v-icon class="pt-1">far fa-list-alt</v-icon>
    </v-btn>

    <!-- <v-btn flat to="/favourites">
      <v-icon class="pt-1">fas fa-bookmark</v-icon>
    </v-btn> -->

    <v-btn flat to="/share">
      <v-icon class="pt-1">fas fa-trophy</v-icon>
    </v-btn>

    <v-btn flat to="/coffee">
      <v-badge right color="#ff4f01" class="bottom-notification">
        <template v-slot:badge>
          <span>{{ $store.getters.getCoffeeTokens.activeTokens.length }}</span>
        </template>
        <v-icon class="pt-1">fas fa-coffee</v-icon>
      </v-badge>
    </v-btn>

    <profile-avatar class="avatar"></profile-avatar>
  </v-bottom-nav>
</template>

<script>
import store from "./SharedState";
import ProfileAvatar from "../Profile/ProfileAvatar";

export default {
  components: {
    ProfileAvatar
  },
  data() {
    return {
      sharedState: store,
      menu: "",
      isVisible: true
    };
  }
};
</script>

<style lang="scss" scoped>


.menu-navigation{
  .v-icon {
    font-size: 20px;
  }
}


.v-item-group.v-bottom-nav .v-btn .v-btn__content i.v-icon{
  color: #7d91ad;
}
.v-item-group.v-bottom-nav .v-btn--active .v-btn__content i.v-icon {
  color: #c61c0a;
}


</style>

<style lang="scss">
.bottom-notification .v-badge__badge  {
  font-style: italic;
  top: 12px;
  right: -7px;
  width: 14px;
  height: 14px;
  font-size: 7px;
}

.v-badge.avatar{
  max-width: 168px;
  min-width: 80px;
  padding: 8px 23px 10px;

  span.v-badge__badge {
    font-size: 7px;
    top: 25px;
    right: 19px;
    width: 14px ;
    height: 14px;
    background-color: blue;
  }

  .v-icon{
    color: #7d91ad !important;
    opacity: 1;
  }
}
</style>
