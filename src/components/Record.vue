<template>
  <v-container>
    <v-row dense>
      <v-col class="my-10" cols="12">
        <div class="text-center">
          <v-btn class="mx-2" fab dark color="indigo" v-on:click="addVoice">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Record",
  methods: {
    addVoice() {
      alert("Start recording. implement me!");
    }
  }
};
</script>
