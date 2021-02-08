<template>
  <v-row dense>
    <v-col v-for="(user, index) in users" :key="index" cols="12">
      <v-card class="mx-auto" max-width="400">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-emoticon-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon v-on:click="call(user.peerID)">
            <v-icon>mdi-phone</v-icon>
          </v-btn>
          <v-btn icon v-on:click="rec(user.peerID)">
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { db } from "../db.js";
import firebase from "firebase/app";

export default {
  name: "Users",
  data: () => ({
    users: []
  }),
  methods: {
    call(peerTo) {
      alert("calling to " + peerTo);
      this.$emit("make-call", peerTo);
    },
    rec: peer => {
      alert("Listen for " + peer + ". Implement me!");
    }
  },
  firestore() {
    return {
      users: db
        .collection("users")
        .where("id", "!=", firebase.auth().currentUser.uid)
    };
  }
};
</script>
