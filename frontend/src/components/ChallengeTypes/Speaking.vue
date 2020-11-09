<template>
  <div class="speaking d-flex">
    <v-btn
      v-if="!recording"
      @click="startRecord()"
      color="white"
      fab
      width="48"
      height="48"
      depressed
    >
      <img src="@/assets/microphone.svg" width="14" height="19" />
    </v-btn>
    <div class="recording d-flex" v-else>
      <v-btn
        @click="stopRecord()"
        color="white"
        fab
        width="48"
        height="48"
        depressed
      >
        <img src="@/assets/pause.svg" width="16" height="16" />
      </v-btn>
      <div class="ml-3 white--text">
        {{ formatedTime }}
      </div>
    </div>
    <div class="small white--text mt-3">
      Toque no botão para gravar a frase
    </div>
    <v-btn
      @click="$emit('cancel')"
      depressed
      color="transparent white--text reset-text-transform small"
      height="40"
      width="100%"
      max-width="264"
    >
      Pular questão
    </v-btn>
  </div>
</template>
<script>
import { Toast } from "vant";
import { Dialog } from "vant";

/* global webkitSpeechRecognition */
export default {
  name: "Speaking",

  data() {
    return {
      result: null,
      recognition: null,
      time: 0,
      recording: false,
      lastTranscript: null,
      interval: null,
    };
  },

  computed: {
    formatedTime() {
      return this.msToHMS(this.time);
    },
  },

  created() {
    const SpeechRecognition = webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "en-US";
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.stop();

    this.recognition.onresult = (e) => {
      const lastResult = e.results[e.results.length - 1];
      const result = lastResult[0];
      this.lastTranscript = result.transcript;

      Toast({
        message: result.transcript,
        position: "bottom",
      });
    };

    this.recognition.onerror = (e) => {
      console.error(e);
    };
  },

  methods: {
    msToHMS(ms) {
      var seconds = ms / 1000;
      seconds = seconds % 3600;
      var minutes = parseInt(seconds / 60);
      seconds = seconds % 60;
      return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    },

    startRecord() {
      this.lastTranscript = null;
      this.interval = setInterval(() => {
        this.time += 1000;
      }, 1000);
      this.recognition.start();
      this.recording = true;
    },
    stopRecord() {
      this.recognition.stop();
      clearInterval(this.interval);
      this.time = 0;
      this.recording = false;

      Dialog.alert({
        title: "O que você cantou foi?",
        message: this.lastTranscript,
        confirmButtonText: "Confirmar",
      }).then(() => {
        // on close
      });
    },
  },
};
</script>
<style scoped>
.speaking {
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
}
.recording {
  align-items: center;
  justify-content: center;
}
</style>
