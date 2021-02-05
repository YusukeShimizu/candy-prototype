<template>
  <v-container>
    <v-row dense>
      <v-col class="my-10" cols="12">
        <div class="text-center">
          <v-btn class="mx-2" fab dark color="indigo" v-on:click="logout">
            <v-icon dark>
              mdi-logout
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "Logout",
  methods: {
    logout() {
      firebase.auth().signOut();
    }
  }
};
</script>
