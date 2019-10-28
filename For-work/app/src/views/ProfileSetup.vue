<template>
  <route-transition>
    <router-view></router-view>
  </route-transition>
</template>

<script>

import RouteTransition from '../plugins/RouteTransition'

export default {
  components: {
    RouteTransition
  }
}
</script>
