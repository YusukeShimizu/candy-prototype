<template>
  <!-- <div id="Record">
    <button v-on:click="addVoice">Rec</button>
  </div> -->
  <div class="text-center">
    <v-btn class="mx-2" fab dark color="indigo" v-on:click="addVoice">
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Record",
  data() {
    return {
      Record: "hoge"
    };
  },
  methods: {
    addVoice() {
      this.$emit("add-voice", this.Record);
    }
  }
};
</script>
