<template>
  <div>
    <User ref="User" @make-call="makeCall" />
    <Users @make-call="makeCall" />
    <Record />
    <Logout />
  </div>
</template>

<script>
import Logout from "./components/Logout";
import User from "./components/User";
import Users from "./components/Users";
import Record from "./components/Record";

export default {
  name: "Main",
  components: {
    Logout,
    User,
    Users,
    Record
  },
  methods: {
    makeCall(peerTo) {
      this.$refs.User.makeCall(peerTo);
    }
  }
};
</script>
