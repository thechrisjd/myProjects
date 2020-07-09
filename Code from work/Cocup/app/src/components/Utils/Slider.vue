<template>
  <div>
    <input type="range" value="0" class="pullee"/>
  </div>
</template>

<script>
export default {
  mounted() {
    const self = this

    var inputRange = document.getElementsByClassName('pullee')[0],
      maxValue = 250, // the higher the smoother when dragging
      speed = 12, // thanks to @pixelass for this
      currValue, rafID;

    // set min/max value
    inputRange.min = 0;
    inputRange.max = maxValue;

    // listen for unlock
    function unlockStartHandler() {
      // clear raf if trying again
      window.cancelAnimationFrame(rafID);

      // set to desired value
      currValue = +this.value;
    }

    function unlockEndHandler() {

      // store current value
      currValue = +this.value;

      // determine if we have reached success or not
      if (currValue >= maxValue) {
        successHandler();
      } else {
        rafID = window.requestAnimationFrame(animateHandler);
      }
    }

    // handle range animation
    function animateHandler() {

      // update input range
      inputRange.value = currValue;

      // determine if we need to continue
      if (currValue > -1) {
        window.requestAnimationFrame(animateHandler);
      }

      // decrement value
      currValue = currValue - speed;
    }

    // handle successful unlock
    function successHandler() {
      self.$emit('swiped')

      // reset input range
      inputRange.value = 0;
    }

    // bind events
    inputRange.addEventListener('mousedown', unlockStartHandler, false);
    inputRange.addEventListener('mousestart', unlockStartHandler, false);
    inputRange.addEventListener('mouseup', unlockEndHandler, false);
    inputRange.addEventListener('touchend', unlockEndHandler, false);
  }
}
</script>

<style lang="scss" scoped>
$size: 100;

@mixin track($color: red, $radius: 0) {
  &::-webkit-slider-runnable-track {
    @content;
    border-radius: $radius;
    background-color: $color;
  }

  &::-moz-range-track {
    @content;
    border-radius: $radius;
    background-color: $color;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-ms-track {
    border: 0;
    @content;
    border-radius: $radius;
    background-color: $color;
    color: transparent;
  }

  &::-ms-fill-lower,
  &::-ms-fill-upper {
    background-color: transparent;
  }

  &::-ms-tooltip {
    display: none;
  }
}

@mixin thumb() {
  &::-webkit-slider-thumb {
    appearance: none;
    @content;
  }

  &::-moz-range-thumb {
    border: 0;
    @content;
  }

  &::-ms-thumb {
    @content;
  }
}

.pullee {
  
  height: 50px;
  appearance: none;
  transform: scale(1.5);

  // handle active states
  &:active {
    @include thumb() {
      transform: scale(1.1);
      cursor: -webkit-grabbing;
      cursor: -moz-grabbing;
    }
  }

  // accessibility
  &:focus {
    outline: none;
  }

  // thumb styles
  @include thumb() {
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #FB8F58;
    transform-origin: 50% 50%;
    transform: scale(1);
    transition: transform ease-out 100ms;
    cursor: -webkit-grab;
    cursor: -moz-grab;
  }

  // track styles
  @include track(#f5f5f5, 1rem) {
    height: 1rem;
    padding: .25rem;
    box-sizing: content-box;
  }
}

html {
  font-size: $size + px;
  text-align: center;
}

h1 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1.25px;
}


</style>
