<template>
  <div>
    <User
      ref="User"
      @is-login="setLoginStatus"
      @update-peers="updatePeers"
      @make-call="makeCall"
    />
    <Peers @make-call="makeCall" :peers="peers" />
    <Record />
    <Logout />
  </div>
</template>

<script>
import Logout from "./components/Logout";
import User from "./components/User";
import Peers from "./components/Peers";
import Record from "./components/Record";

export default {
  name: "Main",
  components: {
    Logout,
    User,
    Peers,
    Record
  },
  data: () => ({
    peers: [],
    login: false
  }),
  methods: {
    setLoginStatus(isLogin) {
      this.login = isLogin;
    },
    updatePeers(peers) {
      if (peers) this.peers = peers;
    },
    makeCall(peerTo) {
      this.$refs.Peer.makeCall(peerTo);
    }
  }
};
</script>
