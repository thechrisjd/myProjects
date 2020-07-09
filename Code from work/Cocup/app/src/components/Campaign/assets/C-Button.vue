<template>
  <!-- keep div wrapper so element can be added styles like margin etc. -->
  <div>
    <a target="_blank" :href="getHrefValue()" @click="postInteraction">
      <div class="_c-button" :style="`min-width: ${width}`">
        <!-- Telephone -->
        <svg v-if="telephone" viewBox="0 0 24 24">
          <path fill="white" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
        </svg>
        <!-- Email -->
        <svg v-else-if="email" viewBox="0 0 24 24">
          <path fill="white" d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
        </svg>
        <!-- Link -->
        <svg v-else viewBox="0 0 24 24">
          <path fill="white" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
        </svg>

        <!-- Button text -->
        <div class="text-slot">
          <slot></slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    email: String,
    telephone: String,
    width: String,
    campaignId: String
  },
  methods: {
    postInteraction() {
      if (this.$store.state.settings.previewMode === true) {
        return console.log('Not recording interaction due to preview mode.')
      }
      const self = this
      const user = this.$store.state.user

      this.$http.post('/v1/interactions', {
        student: user._id,
        campaign: self.campaignId,
        type: 'BUTTON',
        name: self.getInteractionName(),
        description: {
          link: self.link,
          email: self.email,
          telephone: self.telephone
        }
      })
    },
    getInteractionName() {
      if (this.link) {
        return 'Link'
      }
      if (this.email) {
        return 'Email'
      }
      if (this.telephone) {
        return 'Call'
      }
    },
    getHrefValue() {
      if (this.telephone) {
        return 'tel:' + this.telephone 
      } else if (this.email) {
        return 'mailto:' + this.email
      } else if (this.link) {
        if (this.link.startsWith('http')) {
          return this.link
        }
        return '//' + this.link
      }
      return undefined
    }
  }
}
</script>

<style lang="scss" scoped>

._c-button {
  background-image: linear-gradient(to top right, #770F18, #9F1521);
  border-radius: 50px;

  width: fit-content;
  min-width: 100px;
  height: 30px;
  margin: auto;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;

  color: white;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;

  svg {
    float: left;
    width: 15px;
    height: 15px;
    position: relative;
    bottom: -2px;
    margin-right: 6px;
  }

  .text-slot {
    display: inline-block;
    margin-top: 3px;
  }
}

._c-button:active {
  $color-start: darken(#770F18, 5%);
  $color-finish: darken(#9F1521, 5%);
  background-image: linear-gradient(to top right, $color-start, $color-finish);
}


</style>
