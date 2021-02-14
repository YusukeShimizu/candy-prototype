<template>
  <v-container>
    <v-row dense>
      <v-col class="my-10" cols="12">
        <div class="text-center">
          <v-btn
            class="mx-2"
            fab
            dark
            color="indigo"
            v-on:click="saveVoice"
            v-if="isRecording"
          >
            <v-icon dark>
              mdi-radiobox-marked
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            color="indigo"
            v-on:click="addVoice"
            v-else
          >
            <v-icon dark>
              mdi-record
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Record",
  data: () => ({
    isRecording: false,
    localStream: null,
    recorder: null,
    chunks: [],
    audioExtension: ""
  }),
  mounted: async function() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.recorder = new MediaRecorder(this.localStream, {
      mimeType: "video/webm;codecs=vp9"
    });
    this.recorder.addEventListener("dataavailable", ele =>
      this.dataavailable(ele)
    );
    this.recorder.addEventListener("stop", () => this.stop());
  },
  methods: {
    dataavailable(ele) {
      if (ele.data.size > 0) {
        this.chunks.push(ele.data);
        this.audioExtension = this.getExtension(ele.data.type);
      }
    },
    stop() {
      const audioBlob = new Blob(this.chunks);
      const url = URL.createObjectURL(audioBlob);
      let a = document.createElement("a");
      a.href = url;
      a.download = Math.floor(Date.now() / 1000) + this.audioExtension;
      document.body.appendChild(a);
      a.click();
    },
    addVoice() {
      this.isRecording = true;
      this.recorder.start();
    },
    saveVoice() {
      this.isRecording = false;
      this.recorder.stop();
    },
    getExtension(audioType) {
      let extension = "wav";
      const matches = audioType.match(/audio\/([^;]+)/);
      if (matches) {
        extension = matches[1];
      }
      return "." + extension;
    }
  }
};
</script>
