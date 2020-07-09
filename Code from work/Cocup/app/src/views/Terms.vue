<template>
  <div>
    <app-toolbar></app-toolbar>
    <router-view />

    <menu-navigation></menu-navigation>
  </div>
</template>

<script>

import MenuNavigation from '../components/Core/MenuNavigation'
import AppToolbar from '../components/Core/AppToolbar'

import TokenService from '../mixins/TokenService'

export default {
  mixins: [ TokenService ],
  components: {
    MenuNavigation,
    AppToolbar,
  }
}
</script>
