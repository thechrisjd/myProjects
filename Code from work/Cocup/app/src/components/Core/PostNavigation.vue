<template>
  <div class="post-navigation"
    :hidden="$route.path === '/profile' ||
    $route.path === '/coffee' || $route.path === '/share'"
    ref="toolbar">
     <div class="post-buttons" >
          <v-btn flat to="/" small>Jobs</v-btn>
          <v-btn  flat to="/companies" small>Companies</v-btn>
          <v-btn  flat to="/events" small>Events</v-btn>
      </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/cocup-ui.scss';
.post-navigation{
  width: 100%;
  z-index: 1;
  position: fixed;

  .scroll-down &{
    transform: translateY(-50px);
  }
}
.post-buttons{
    background-color: $text-color-light;
    display: flex;
    justify-content: space-around;
    padding-bottom: 5px;
}
.v-btn{
    margin: 0;
    font-size: 16px;
    text-transform: capitalize;
    color: $text-color;
}
.v-btn--active{
    position: relative;

    &:after{
    content: "";
    position: absolute;
    width: 50%;
    height: 1px;
    bottom: 0;
    left: 25%;
    border-bottom: 2px solid $text-color;
}
}
</style>