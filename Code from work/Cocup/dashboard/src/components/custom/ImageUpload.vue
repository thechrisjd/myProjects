// A global component for image uploading. The url of the uploaded image is synced with the v-model attached to this component.
// https://alligator.io/vuejs/add-v-model-support/
<template>
  <div>
    <v-btn color="info" dark outline small @click="dialog = true">
      <v-icon left dark small>attach_file</v-icon>
      Upload {{ label || 'image'}}
    </v-btn>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Upload image: <i>{{label}}</i></span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <!-- input file -->
                  <div class="box">
                    <input type="file" id="file-input">
                  </div>
                  <!-- leftbox -->
                  <div class="box-2">
                    <div class="result"></div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveImage" :loading="loading" :disabled="!fileSelected || loading">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css'

export default {
  props: ['value', 'label', 'aspectRatio'],
  data() {
    return {
      fileSelected: false,
      loading: false,
      imageUrl: '',
      dialog: false,
      cropper: {},
    }
  },
  mounted() {
    // vars
    let result = document.querySelector('.result')
    let upload = document.querySelector('#file-input')
    const self = this

    // on change show image with crop options
    upload.addEventListener('change', (e) => {
      self.fileSelected = true

      if (e.target.files.length) {
        // start file reader
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target.result) {
            // create new image
            let img = document.createElement('img');
            img.id = 'image';
            img.src = e.target.result
            img.style.maxWidth = '100%';
            // clean result before
            result.innerHTML = '';
            // append new image
            result.appendChild(img);
            // init cropper
            this.cropper = new Cropper(img, {
              aspectRatio: this.aspectRatio
            });
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });

  },
  methods: {
    saveImage() {
      this.loading = true

      let imgSrc = this.cropper.getCroppedCanvas({
        width: 400 // input value
      }).toDataURL('image/jpeg');
      this.imageSource = imgSrc

      const blob = this.dataURItoBlob(imgSrc)
      this.onUpload(blob)
    },
    onUpload(blob) {
      this.loading = true

      const self = this
      const formData = new FormData()
      formData.append('image', blob)

      this.$http.post('/v1/image-upload', formData)
        .then(response => {
          this.loading = false
          const imageUrl = response.data.imageUrl
          this.imageUrl = imageUrl
          
          this.loading = false
          this.dialog = false

          // send image value after cropping to parent
          self.$emit('input', imageUrl)
        })
        .catch(error => {
          this.loading = false
          throw new Error('Could not upload image')
        })
    },
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else
        byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {
        type: mimeString
      });
    }

  }
}
</script>

<style lang="scss" scoped>

.box {
	padding: 0.5em;
	width: 100%;
	margin:0.5em;
}

.box-2 {
	padding: 0.5em;
	width: calc(100%/2 - 1em);
}


img {
	max-width: 100%;
}

</style>
