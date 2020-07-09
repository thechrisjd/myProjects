<!--possible delete. Does not used from end of october 2019 -->

<template>
  <v-layout align-center justify-center column wrap>
    <v-flex xs12>
      <v-avatar size="120px" v-ripple @click="$refs.file.click()">
        <img v-if="$store.state.studentInfo.profile && $store.state.studentInfo.profile.pictureUrl"
        :src="$store.state.studentInfo.profile.pictureUrl"
          alt="Avatar">
        <v-icon x-large v-else color="grey"> account_circle </v-icon>
      </v-avatar>
      <input type="file" accept="image/*" ref="file" style="display: none">
    </v-flex>
  </v-layout>
</template>
