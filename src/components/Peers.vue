<template>
  <v-row dense>
    <v-col v-for="(peer, index) in peers" :key="index" cols="12">
      <v-card class="mx-auto" max-width="344">
        <v-list-item>
          <v-list-item-icon>
            <v-btn v-on:click="call(peer)">
              <v-icon>mdi-phone</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ peer }}</v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Peers",
  props: {
    peers: Array
  },
  methods: {
    call: peer => {
      alert("calling to " + peer);
    }
  }
};
</script>
