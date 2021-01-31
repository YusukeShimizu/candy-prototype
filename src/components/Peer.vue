<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="my-10" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome👍
        </h1>
        <v-row class="my-2" justify="center">
          <p>Your peer id: {{ peer.id }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Peer from "skyway-js";

export default {
  name: "Peer",
  data: () => ({
    peer: Peer,
    localStream: {}
  }),
  mounted: async function() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
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
    peer.on("call", call => {
      call.answer(this.localStream);
    });
  },
  methods: {
    makeCall(peerTo) {
      // const call = this.peer.call(peerTo, this.localStream);
      // this.connect(call);
    },
    connect: function(call) {
      call.on("stream", stream => {
        const el = document.getElementById("their-video");
        el.srcObject = stream;
        el.play();
      });
    }
  }
};
</script>
