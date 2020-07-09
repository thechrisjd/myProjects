<template>
  <div class="profile-photo">
    <v-avatar v-ripple @click="$refs.file.click()">
      <img
        v-if="$store.state.studentInfo.profile && $store.state.studentInfo.profile.pictureUrl"
        :src="$store.state.studentInfo.profile.pictureUrl"
        alt="Avatar"
      />
      <div v-else>
        <v-icon x-large color="grey">account_circle</v-icon>
        <div class="change-picture">Change profile picture</div>
      </div>
    </v-avatar>
    <input type="file" accept="image/*" ref="file" style="display: none" />
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/cocup-ui.scss';

.profile-photo {
  text-align: center;
}
.v-avatar {
  width: 208px !important;
  height: 208px !important;
  text-align: center;

  img {
    width: 208px;
    height: 208px;
    border-radius: 104px;
  }
  .v-icon {
    font-size: 208px !important;
  }

  .change-picture{
    font-size: 13px;
    font-weight: 500;
    color: $profile-second-color;
    margin-top: -15px;
  }
}
</style>