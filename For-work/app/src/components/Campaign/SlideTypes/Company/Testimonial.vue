<template>
  <div class="slide-general">
    <div class="quote"
      :class="{horizontal: options.position === 'horizontal', vertical: options.position === 'vertical'}"
      v-html="params.text">
    </div>
    <div class="author"
      :class="{horizontal: options.position === 'horizontal', vertical: options.position === 'vertical'}">
      <img :src="params.author.image" alt="">
      <br>
      <label>
        {{ params.author.name }}
        <br>
        {{ params.author.title }}
      </label>
    </div>
  </div>
</template>
<style lang="scss" scoped>

.slide-general {
  width: 100%;
  height: 100%;
  margin-top: 10%;

  .quote {
    p {
      font-size: 12px;
      text-align: center;
      padding: 5px 5px 0px 5px;
    }
    background-repeat: no-repeat;
    background-size: contain;
    &.horizontal {
      width: 85%;
      height:70%;
      background-image: url('/img/templates/ui/quote-horizontal.png');
      margin: auto;
      margin-top: -10px;
    }
    &.vertical {
      background-image: url('/img/templates/ui/quote-vertical.png');
      width: 55%;
      height: 111%;
      margin-top: -10px;
      margin-left: 10px;
      float: left;
    }
  }
  .author {
    width: 40%;
    label {
      font-size: 12px;
      line-height: 5px;
    }
    &.horizontal {
      margin: auto;
      img {
        height: 50px;
        width: 50px;
        border-radius: 100%;

      }
    }
    &.vertical {
      float: right;
      margin-top: 10%;
      img {
        height: 80px;
        width: 80px;
        border-radius: 100%;
      }
    }
  }
}

</style>
<script>

export default {
  props: {
    params: Object, 
    options: {
      type: Object,
      default() {
        return {
          position: 'horizontal'
        }
      }
    }
  }
}
</script>
