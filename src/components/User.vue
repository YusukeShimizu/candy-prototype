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
        this.setUser(user);
      } else {
        this.close();
      }
    });
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    window.addEventListener("beforeunload", this.close);
  },
  watch: {
    user: function(user) {
      if (user) {
        const peer = new Peer({
          key: process.env.VUE_APP_SKYWAY_APIKEY,
          debug: 3
        });
        peer.on("open", () => {
          this.peer = peer;
          db.ref("users/" + user.uid).update({
            name: user.displayName,
            peerID: peer.id,
            id: user.uid
          });
          this.peerStatus = "open";
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
      }
      // Create a reference to this user's specific status node.
      // This is where we will store data about being online/offline.
      const userStatusDatabaseRef = db.ref("users/" + user.uid);

      // We'll create two constants which we will write to
      // the Realtime database when this device is offline
      // or online.
      const isOfflineForDatabase = {
        state: "offline",
        last_changed: firebase.database.ServerValue.TIMESTAMP
      };

      const isOnlineForDatabase = {
        state: "online",
        last_changed: firebase.database.ServerValue.TIMESTAMP
      };

      // Create a reference to the special '.info/connected' path in
      // Realtime Database. This path returns `true` when connected
      // and `false` when disconnected.
      db.ref(".info/connected").on("value", function(snapshot) {
        // If we're not currently connected, don't do anything.
        if (snapshot.val() == false) {
          return;
        }

        // If we are currently connected, then use the 'onDisconnect()'
        // method to add a set which will only trigger once this
        // client has disconnected by closing the app,
        // losing internet, or any other means.
        userStatusDatabaseRef
          .onDisconnect()
          .update(isOfflineForDatabase)
          .then(function() {
            // The promise returned from .onDisconnect().set() will
            // resolve as soon as the server acknowledges the onDisconnect()
            // request, NOT once we've actually disconnected:
            // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

            // We can now safely set ourselves as 'online' knowing that the
            // server will mark us as offline once we lose connection.
            userStatusDatabaseRef.update(isOnlineForDatabase);
          });
      });
    }
  },
  methods: {
    setUser(user) {
      if (!user) return;
      db.ref("users/" + user.uid).update({
        name: user.displayName
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
    },
    close() {
      this.peer.destroy();
    }
  }
};
</script>
