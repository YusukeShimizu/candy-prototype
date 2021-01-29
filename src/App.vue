<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon>mdi-monitor-speaker</v-icon>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/YusukeShimizu/candy-prototype"
        target="_blank"
        text
      >
        <span class="mr-2">github</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <HelloWorld />
      <Record @add-voice="addVoice" />
      <VoiceList :voices="voices"></VoiceList>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import VoiceList from "./components/VoiceList";
import Record from "./components/Record";

export default {
  name: "App",

  components: {
    HelloWorld,
    VoiceList,
    Record
  },

  data: () => ({
    voices: state.voices
  }),
  methods: {
    addVoice(newvoice) {
      if (!newvoice) {
        return;
      }
      this.voices.push({
        id: newvoice
      });
    }
  }
};
var state = {
  voices: [{ id: "Foo" }, { id: "Bar" }]
};
</script>
