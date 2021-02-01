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
        <v-row class="my-2" justify="center">
          <p>peer status: {{ status }}</p>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <audio autoplay :srcObject.prop="stream" />
    </div>
  </v-container>
</template>

<script>
import Peer from "skyway-js";

export default {
  name: "Peer",
  data: () => ({
    peer: Peer,
    status: "beforeOpen",
    localStream: {},
    stream: {}
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
      this.status = "open";
      this.peer.listAllPeers(peers => {
        this.$emit(
          "update-peers",
          peers.filter(p => p != peer.id)
        );
      });
    });
    peer.on("call", call => {
      this.status = "call";
      call.answer(this.localStream);
      this.connect(call);
    });
    peer.on("disconnected", id => {
      this.status = "disconnected";
      alert(id + "との接続が切れました");
    });
    peer.on("error", err => {
      this.status = "error";
      alert(err.message);
    });
    peer.on("close", () => {
      this.status = "close";
      alert("通信が切断しました。");
    });
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.peer.destroy());
  },
  methods: {
    makeCall(peerTo) {
      const call = this.peer.call(peerTo, this.localStream);
      this.connect(call);
    },
    connect: async function(call) {
      call.on("close", () => {
        this.status = "close";
        alert("通信が切断しました。");
      });
      call.on("stream", stream => {
        this.stream = stream;
        this.status = "connect";
        this.stream.play();
      });
    }
  }
};
</script>
