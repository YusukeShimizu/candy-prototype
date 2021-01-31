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
      <Peer @update-peers="peers = $event" />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Peer from "./components/Peer";

export default {
  name: "App",
  components: {
    HelloWorld,
    Peer
  },
  data: () => ({
    peers: []
  }),
  methods: {
    updatePeers(peers) {
      // TODO: filter myself
      if (peers) this.peers = peers;
    }
  }
};
</script>
