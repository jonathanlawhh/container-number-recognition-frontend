<template>
  <div>

    <v-btn color="primary" @click="overlay = !overlay" rounded="pill" variant="outlined">
      Launch CNRAI
    </v-btn>

    <v-overlay v-model="overlay" width="100%" height="100%" :style="'background-color: ' + dynamic_bg_color" style="opacity: 1">
      <v-container style="height: 100vh">
        <v-btn icon="mdi-close" size="default" class="close-btn" @click="overlay = false"></v-btn>
        <v-row class="mt-12">
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
                        <pre style="overflow-x: auto; word-wrap: break-word; white-space: pre-wrap; font-size: 14px;">{{ output }}</pre>
                      </v-card-item>
                    </v-card>
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
export default {
  name: "ContainerDetector",
  data: () => ({
    overlay: false,
    input_image: [],
    display_image: null,
    final_display_image: '/img/upload_container_image.webp',
    output: JSON.stringify({'message': 'upload a shipping container image'}, null, '\t'),
    dynamic_bg_color: '#d8c3a5'
  }),
  methods: {
    output_message(msg) {
      return JSON.stringify({'message': msg}, null, '\t')
    },
    async detect_container_number() {
      let tbp = this.input_image[0]
      this.final_display_image = null

      if (!tbp || !tbp.type.startsWith('image')) {
        this.display_image = null
        this.output = !tbp ? this.output_message('no file found') : this.output_message('wrong file type')

        this.final_display_image = '/img/upload_container_image.webp'

        return false
      }

      this.display_image = URL.createObjectURL(tbp)

      const formData = new FormData()
      formData.append('image', tbp)

      this.output = this.output_message('detecting...')

      const config = useRuntimeConfig()
      if (!config.public.ctnrApiUrl) {
        this.output = this.output_message('issue calling backend, please inform the administrator.')
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
            this.output = JSON.stringify(error, null, '\t')
          })
          .finally(() => {
            this.final_display_image = this.display_image
          })
      return true
    }
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