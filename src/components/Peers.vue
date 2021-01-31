<template>
  <v-row dense>
    <v-col v-for="(peer, index) in peers" :key="index" cols="12">
      <v-card class="mx-auto" max-width="400">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-emoticon-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ peer }}</v-list-item-subtitle>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon v-on:click="call(peer)">
            <v-icon>mdi-phone</v-icon>
          </v-btn>
          <v-btn icon v-on:click="rec(peer)">
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Peers",
  props: {
    peers: Array
  },
  methods: {
    call(peerTo) {
      alert("calling to " + peerTo);
      this.$emit("make-call", peerTo);
    },
    rec: peer => {
      alert("Listen for " + peer + ". Implement me!");
    }
  }
};
</script>
