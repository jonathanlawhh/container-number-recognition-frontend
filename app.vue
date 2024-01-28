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

    <PageFooter class="mt-16"></PageFooter>
  </v-app>
</template>

<script setup>
let title = 'Container Number Recognition AI'
let desc = 'Revolutionize logistics operations with effortless monitoring. Container number recognition using AI (CNRAI) extracts container numbers from images, saving time and improving operational efficiency and reducing supply chain risk.'

useSeoMeta({
  title: title,
  ogTitle: title,
  description: desc,
  ogDescription: desc,
  ogImage: 'https://cnrai.jonathanlawhh.com/img/og/container_ai_header.jpg',
  twitterCard: 'summary_large_image',
})

useHead({
  script: [
    {
      hid: "ld-json",
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "dateCreated": "2024-01-28T00:00:00-05:00",
        "applicationCategory": "Logistics",
        "name": title,
        "alternateName": "CNRAI",
        "url": "https://reviewnator.jonathanlawhh.com/",
        "operatingSystem": "Any"
      })
    }
  ]
})
</script>