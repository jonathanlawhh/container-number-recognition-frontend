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

      <NuxtPage></NuxtPage>
    </v-container>

    <PageFooter></PageFooter>
  </v-app>
</template>

<script setup>

let title = 'Container Number Recognition AI'
useSeoMeta({
  title: title,
  ogTitle: title,
  description: '',
  ogDescription: '',
  ogImage: 'https://jonathanlawhh.com/img/me.webp',
  twitterCard: 'summary_large_image',
})
</script>