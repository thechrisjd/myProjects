<template>
  <v-card>
    <v-form>
      <v-container class="gray-background">
        <v-flex>
          <p>This slide is the face of your campaign.</p>
        </v-flex>
        <v-flex md12 class="mt-2">
          <v-text-field v-model="campaign.name" maxlength="25" counter box label="Company Name" required></v-text-field>
        </v-flex>
        <v-flex md12>
          <v-textarea v-model="slide.params.description" maxlength="70" counter box label="Brief Description" required>
          </v-textarea>
        </v-flex>

        <v-layout>
          <v-flex xs12 md6>
            <v-select :items="['1 - 50', '51 - 250', '251 - 1000', '1000 +']" label="Employees" box
              v-model="slide.params.employees"></v-select>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field v-model="slide.params.location.city" maxlength="30" counter label="City" box required>
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-flex md5>
          <image-upload v-model="slide.params.images.logo" label="Company Logo" :aspect-ratio="1/1" required>
          </image-upload>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="info" dark outline small @click="dialog = true" v-on="on">
                <v-icon left dark small>colorize</v-icon>
                Change logo color fill
              </v-btn>
            </template>
            <chrome-picker :value="slide.params.images.logoBackgroundColor" @input="updateColor"></chrome-picker>
          </v-menu>

          <image-upload v-model="slide.params.images.background" label="Background Image" :aspect-ratio="35/10"
            required></image-upload>
        </v-flex>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  props: ['campaign', 'slide'],
  components: {
    'chrome-picker': Chrome
  },
  created() {
    this.slide.params.images.logoBackgroundColor = '#fff'
  },
  methods: {
    updateColor(color) {
      this.slide.params.images.logoBackgroundColor = color.hex

      // force update of color. Might be a deep watching issue.
      const tempVal = this.campaign.name 
      this.campaign.name = ''
      this.campaign.name = tempVal
    }
  }
}
</script>

