<template>
  <div>
    <v-row class="mt-4">
      <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2">
        <v-card rounded="lg">
          <v-row>
            <v-col cols="12" md="6" lg="4" style="max-height: 600px">
              <v-img min-height="280" width="100%" height="100%" style="background-color: #8e8d8a" src="/img/container_ai_img.png" cover></v-img>
            </v-col>
            <v-col cols="12" md="6" lg="8">
              <v-container>
                <h3>Container Number Recognition using AI</h3>
                <br/>
                <p>This web application demonstrates the potential of
                  utilizing the technology behind it to achieve operational excellency.</p>
                <br/><br/>
                <p> Launch the application and upload an image of a container!</p>
                <ContainerDetector class="mt-8"></ContainerDetector>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <Why class="text-center mt-8"></Why>

  </div>
</template>

<script>
export default {
  name: "index",
}
</script>
