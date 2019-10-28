// This layout is loaded when the user is logged in
// It handles user state synchronization with the server

<template>
  <div>
    <app-toolbar></app-toolbar>
    <post-navigation v-if="$store.ismobile" ></post-navigation>

    <router-view />

    <menu-navigation></menu-navigation>
  </div>
</template>

<script>

import MenuNavigation from '../components/Core/MenuNavigation'
import AppToolbar from '../components/Core/AppToolbar'
import PostNavigation from '../components/Core/PostNavigation'

// Load user management module to take care of updating the user
// automatically on the server when it changes in localStorage
//import UserManagementMixin from '../mixins/UserService'
import TokenService from '../mixins/TokenService'

export default {
  mixins: [ TokenService ],
  components: {
    MenuNavigation,
    AppToolbar,
    PostNavigation
  }
}
</script>
