<template>
  <div class="info-container">
    <v-icon size="22" color="#707070" class="icon-container">{{ icon }}</v-icon>
    <span class="icon-text">{{ text }}</span>
  </div>

</template>

<script>
export default {
  props: ['icon', 'text'],
}
</script>

<style lang="scss" scoped>

.info-container {
  overflow: hidden;
  font-weight: 500;

  .icon-container {
    padding-top: 5px;
  }

  .icon-text {
    width: 65%;
    color: #707070;
    font-size: 10px;
    margin: 1px 0 0 20px;
    display: inline-block;
    vertical-align: middle;
  }
}

</style>
