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
      <Peer ref="Peer" @update-peers="updatePeers" @make-call="makeCall" />
      <Peers @make-call="makeCall" :peers="peers" />
      <Record />
    </v-main>
  </v-app>
</template>

<script>
import Peer from "./components/Peer";
import Peers from "./components/Peers";
import Record from "./components/Record";

export default {
  name: "App",
  components: {
    Peer,
    Peers,
    Record
  },
  data: () => ({
    peers: []
  }),
  methods: {
    updatePeers(peers) {
      if (peers) this.peers = peers;
    },
    makeCall(peerTo) {
      this.$refs.Peer.makeCall(peerTo);
    }
  }
};
</script>
