<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="my-10" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">Welcome👍</h1>
        <v-row class="my-2" justify="center">
          <p>Your peer id: {{ peer.id }}</p>
        </v-row>
        <v-row class="my-2" justify="center">
          <p>peer status: {{ peerStatus }}</p>
        </v-row>
        <v-row class="my-2" justify="center">
          <p>call status: {{ callStatus }}</p>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <audio autoplay :srcObject.prop="stream" />
    </div>
  </v-container>
</template>
<script>
import { db } from "../db.js";
import firebase from "firebase/app";
import Peer from "skyway-js";

export default {
  name: "User",
  data: () => ({
    user: null,
    peer: Peer,
    call: Peer.call,
    peerStatus: "beforeOpen",
    callStatus: "close",
    localStream: {},
    stream: {},
    firebase: []
  }),
  mounted: async function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$emit("is-login", true);
        this.setUser(user || null);
      } else {
        this.$emit("is-login", false);
      }
    });
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
      this.peerStatus = "open";
      this.peer.listAllPeers(peers => {
        this.$emit(
          "update-peers",
          peers.filter(p => p != peer.id)
        );
      });
    });
    peer.on("call", call => {
      call.answer(this.localStream);
      this.connect(call);
    });
    peer.on("disconnected", id => {
      this.peerStatus = "disconnected";
      alert(id + "との接続が切れました");
    });
    peer.on("error", err => {
      this.peerStatus = "error";
      alert(err.message);
    });
    peer.on("close", () => {
      this.peerStatus = "close";
      alert("通信が切断しました。");
    });
  },
  methods: {
    setUser(user) {
      if (!user) return;
      db.collection("users")
        .doc(user.uid)
        .set({
          name: user.displayName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.user = user;
    },
    makeCall(peerTo) {
      const call = this.peer.call(peerTo, this.localStream);
      this.connect(call);
    },
    connect: async function(call) {
      call.on("close", () => {
        this.callStatus = "close";
        alert("通信が切断しました。");
      });
      call.on("stream", stream => {
        this.stream = stream;
        this.callStatus = "connect";
        this.stream.play();
      });
    }
  },
  destroyed() {
    window.removeEventListener("beforeunload", () => {
      this.peer.destroy();
      this.call.close({ forceClose: true });
    });
  }
};
</script>
