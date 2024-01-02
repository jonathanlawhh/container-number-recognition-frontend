<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2">
          <v-card rounded="lg" variant="outlined">
            <v-card-item>
              <h1>CNRAI</h1>
              <h2>AI in Logistics</h2>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2">
          <h2 class="font-weight-black" style="font-size: 8rem">{{ error.statusCode }}...</h2>
          <p style="font-size: 1.5rem">
            Now this seems worst than a missing container number
          </p>
        </v-col>
        <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2">
          <v-btn to="/" variant="outlined" size="large" class="mt-16" color="primary">Go back to home page</v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Lost',
  ogTitle: 'Lost',
  ogImage: 'https://jonathanlawhh.com/img/me.webp',
  twitterCard: 'summary_large_image',
})

const props = defineProps({
  error: Object
})
</script>