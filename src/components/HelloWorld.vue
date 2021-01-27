<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="my-10" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome👍
        </h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          features?
        </h2>
        <v-row class="my-2" justify="center">
          <p
            v-for="(next, i) in features"
            :key="i"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    features: [
      {
        text: "60秒で投稿する"
      },
      {
        text: "聞いてみる"
      },
      {
        text: "リプライトークする"
      }
    ]
  })
};
</script>
