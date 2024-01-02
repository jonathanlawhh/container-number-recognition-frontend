<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3>Why use a container number recognition system?</h3>
      </v-col>

      <v-col cols="12" md="4" v-for="(w ,i) in why_data" :key="i">
        <v-card min-height="172px" max-width="500" variant="outlined" color="white" style="background-color:#e85a45"
                rounded="xl">
          <v-card-item class="pa-8">
            <h4>{{ w[0] }}</h4>
            <br/>
            <p>{{ w[1] }}</p>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Why",
  data: () => ({
    why_data: [
      ['Effortless Monitoring', 'Instantly identify containers with lightning-fast OCR technology. Track your containers on premise with increased accuracy and minimize delays.'],
      ['Operational Efficiency', 'Streamline your logistics by eliminating manual data entry and human error. Integrate with your existing systems for a seamless workflow and maximize productivity.'],
      ['Supply Chain Security', 'Gain real-time visibility into your container movements from docking to transit. Eliminate uncertainty and reduce risk in the supply chain.']
    ]
  })
}
</script>

<style scoped>
.v-card:hover {
  outline: 1px solid #e85a45;
  outline-offset: 2px;
  cursor: pointer;
  transition: all 0.15s ease-in;
}
</style>