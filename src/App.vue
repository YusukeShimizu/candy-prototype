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
      <div v-if="isLogin">
        <Peer ref="Peer" @update-peers="updatePeers" @make-call="makeCall" />
        <Peers @make-call="makeCall" :peers="peers" />
        <Record />
        <Logout />
      </div>
      <div v-else>
        <Login />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Login from "./components/Login";
import Logout from "./components/Logout";
import Peer from "./components/Peer";
import Peers from "./components/Peers";
import Record from "./components/Record";
import firebase from "firebase/app";

export default {
  name: "App",
  components: {
    Login,
    Logout,
    Peer,
    Peers,
    Record
  },
  data: () => ({
    peers: [],
    isLogin: false
  }),
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      this.isLogin = user ? true : false;
    });
  },
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
