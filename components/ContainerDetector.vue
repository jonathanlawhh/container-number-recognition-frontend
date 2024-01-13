<template>
  <div>

    <v-btn color="primary" @click="overlay = !overlay" rounded="pill" variant="outlined">
      Launch CNRAI
    </v-btn>

    <v-overlay v-model="overlay" width="100%" height="100%" :style="'background-color: ' + dynamic_bg_color"
               style="opacity: 1">
      <v-container style="height: 100vh">
        <v-btn icon="mdi-close" size="default" class="close-btn" @click="overlay = false"></v-btn>
        <v-row>
          <v-col cols="12" md="8" offset-md="2">
            <v-card rounded="lg">
              <v-card-item>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-img :src="final_display_image" :lazy-src="display_image" height="280" id="preview_img"
                           style="background-color: #8e8d8a"
                           class="rounded-lg" cover>
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular
                              color="grey-lighten-4"
                              indeterminate
                          ></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-card variant="outlined" height="280" style="overflow-y: scroll">
                      <v-card-item>
                        <pre style="overflow-x: auto; word-wrap: break-word; white-space: pre-wrap; font-size: 14px;">{{
                            output
                          }}</pre>
                      </v-card-item>
                    </v-card>
                  </v-col>

                  <v-col cols="12">
                    <v-switch
                        color="primary"
                        inset
                        v-model="allow_local_detection"
                        hide-details
                        label="container detection"
                    ></v-switch>
                  </v-col>

                  <v-col cols="12" md="10" lg="8">
                    <v-file-input
                        v-model="input_image"
                        color="primary"
                        :multiple="false"
                        label="Select your container image"
                        placeholder="Select your container image"
                        prepend-icon="mdi-paperclip"
                        variant="outlined"
                        @change="detect_container_number"
                        accept=".png,.webp,.jpg,.jpeg,.bmp"
                    >
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import {toRaw} from 'vue'

export default {
  name: "ContainerDetector",
  data: () => ({
    overlay: false,
    input_image: [],
    display_image: null,
    final_display_image: '/img/upload_container_image.webp',
    output: JSON.stringify({'message': 'Loading model...'}, null, '\t'),
    dynamic_bg_color: '#d8c3a5',
    allow_local_detection: true,
    model: null,
    local_detection: [],
  }),
  methods: {
    set_output_message(msg) {
      this.output = JSON.stringify({'message': msg}, null, '\t')
    },
    async get_container_door(url) {
      this.set_output_message('checking for container...')
      this.local_detection = []

      let img = new Image();
      img.src = url

      // Wait for image to be initialized
      const waitImgLoad = async (img) => {
        return new Promise((resolve) => {
          img.onload = async () => {
            resolve(true)
          }
        })
      }
      let imgLoaded = await waitImgLoad(img)

      // get detection result
      const rawModel = toRaw(this.model)
      const tfImg = tf.browser.fromPixels(img).toInt();
      const expandedDims = tfImg.expandDims();

      await rawModel.executeAsync(expandedDims).then(predictions => {
        this.set_output_message('prediction completed, parsing...')
        // for (let i = 0; i < predictions.length; i++) {
        //   console.log(i, predictions[i].arraySync()[0])
        // }

        let detection_res = []
        for (let i = 0; i < predictions[0].arraySync()[0].length; i++) {
          if (predictions[3].arraySync()[0][i] > 0.8) {
            detection_res.push({
              bbox: predictions[1].arraySync()[0][i],
              probability: predictions[3].arraySync()[0][i]
            })
          }
        }

        this.local_detection = detection_res

        // 0 is classes
        // 1 is bounding box
        // 3 is probability
      })

          .catch((err) => {
            this.set_output_message(err)
          })

          .finally(() => {
            this.set_output_message(this.local_detection)
            tf.dispose([tfImg, expandedDims])
          })
    },
    async detect_container_number() {
      const tbp /** @type{File} */ = this.input_image[0]
      this.final_display_image = null

      if (!tbp || !tbp.type.startsWith('image')) {
        this.display_image = null
        !tbp ? this.set_output_message('no file found') : this.set_output_message('wrong file type')

        this.final_display_image = '/img/upload_container_image.webp'

        return false
      }

      this.display_image = URL.createObjectURL(tbp)

      const blobToData = async (blob) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(blob)
        })
      }

      // If we allow local SSD to run and provide output
      if (this.allow_local_detection) {
        let res = await blobToData(tbp)

        await this.get_container_door(res)
        if (this.local_detection.length === 0) {
          this.set_output_message('no containers detected. this could be due to image quality or container being too far.')
          this.final_display_image = this.display_image
          return false
        }
      }

      const formData = new FormData()
      formData.append('image', tbp)
      formData.append('bbox', this.local_detection ?? [])

      this.set_output_message('sending for ocr...')

      const config = useRuntimeConfig()
      if (!config.public.ctnrApiUrl) {
        this.set_output_message('issue calling backend, please inform the administrator.')
        return false
      }

      fetch(config.public.ctnrApiUrl, {
        method: 'POST',
        body: formData
      })
          .then(response => response.json())
          .then(data => {
            this.output = JSON.stringify(data, null, '\t')
            if (data['container_color'] && data['container_color'].length === 3) {
              this.dynamic_bg_color = 'rgb(' + data['container_color'].reverse().join(',') + ')'
            }
          })
          .catch(error => {
            this.set_output_message(error)
          })
          .finally(() => {
            this.final_display_image = this.display_image
          })
      return true
    }
  },
  async mounted() {
    this.model = await loadGraphModel("/model/model.json")
    this.set_output_message('upload a shipping container image')
  }
}
</script>

<style scoped>
.close-btn {
  position: absolute;
  right: 20%;
  top: 5%;
  z-index: 5
}

@media only screen and (max-width: 958px) {
  .close-btn {
    right: 5%;
    top: 8%;
  }
}
</style>