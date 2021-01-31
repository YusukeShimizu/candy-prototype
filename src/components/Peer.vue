<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto" max-width="344">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-emoticon-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ peer.id }}</v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Peer from "skyway-js";

export default {
  name: "Peer",
  data: () => ({
    peer: Peer
  }),
  mounted: async function() {
    const peer = new Peer({
      key: process.env.VUE_APP_SKYWAY_APIKEY,
      debug: 3
    });
    peer.on("open", () => {
      this.peer = peer;
      this.peer.listAllPeers(peers => {
        this.$emit(
          "update-peers",
          peers.filter(p => p != peer.id)
        );
      });
    });
  }
};
</script>
