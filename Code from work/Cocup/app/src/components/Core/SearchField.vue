<template>
  <v-autocomplete
    :label="label"
    :items="itemsForAutocomplete"
    single-line
    v-on:click:append="openCloseMenuArrow"
    ref="menuArrow"
    v-model="result"
  ></v-autocomplete>
</template>

<script>
export default {
  props: {
    label: String,
    itemsForAutocomplete: Array,
    value: String
  },
  data() {
    return {
      result: String
    }
  },
  watch: {
    result: function(x) {
      this.$emit('input', x);
    }
  },
  mounted() {
    this.result = this.value;
  },
  methods: {
    openCloseMenuArrow() {
      const productSortSelect = this.$refs.menuArrow;
      if (productSortSelect.isMenuActive) {
        this.$refs.menuArrow.isMenuActive = false;
        productSortSelect.blur();
      } else {
        this.$refs.menuArrow.isMenuActive = true;
        productSortSelect.focus();
      }
    }
  }
};
</script>

<style lang="scss">
.v-list__tile__content{
    font-size: 12px !important;
  }
//AUTOCOMPLETE ELEMET//
.v-autocomplete.v-input {
  max-width: 600px;
  z-index: 1;

  &.v-text-field {
    padding: 0;
    margin-top: 15px;

    input {
      padding-bottom: 0;
    }
  }

  
  // .v-input__control .v-input__slot {
  //   z-index: 1;
  //   background-color: rgba(0, 0, 0, 0.2);
  //   border-radius: 5px;

  //   &:before,
  //   &:after{
  //     border-style: none;
  //   }

  //   .v-select__slot {
  //     margin-top: 0px;
  //   }
  // }

}
//END AUTOCOMPLETE ELEMET//
</style>