<template>
  <div class="slide-general">
   {{type}}
  </div>
</template>
<style lang="scss" scoped>

.slide-general {
  width: 100%;
  height: 100%;
}

</style>
<script>

export default {
  props: ['params', 'type']
}
</script>
