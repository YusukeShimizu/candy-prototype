<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="my-10" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          VoiceList will be implemented
        </h1>
        <li v-for="voice in voices" :key="voice.id">
          {{ voice.id }}
        </li>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "VoiceList",
  props: {
    voices: Array
  },
  data: () => ({})
};
</script>
