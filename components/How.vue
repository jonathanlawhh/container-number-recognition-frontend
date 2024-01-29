<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3>How does it work?</h3>
      </v-col>

      <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2">
        <v-img src="/img/container_ai_how_header.webp" width="100%" style="min-height: 240px"/>
        <br/>
        <p class="ma-auto">
          Image => Single Shot Detector (SSD) => Optical Character Recognition (OCR) => Logic based filtering => Output
        </p>
      </v-col>

      <v-col cols="12">
        <p class="ma-auto">
          <v-btn variant="outlined" to="tech">Dive deeper into the tech</v-btn>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "How"
}
</script>

<style scoped>

</style>