<template>
  <div class="challenge-page">
    <v-container>
      <v-row class="flex-grow-0 flex-shrink-0" no-gutters>
        <v-btn @click="$router.back()" class="text-center" icon>
          <img src="@/assets/arrow-left.svg" width="14" height="14" />
        </v-btn>
        <v-spacer class="text-left ml-2">
          <div class="small white--text"><b>Miracle Aligner</b></div>
          <div class="extra-small white--text">The Last Shadow Puppets</div>
        </v-spacer>
        <div class="white--text regular d-flex coins-earned">
          300
          <img class="ml-2" src="@/assets/money.svg" width="16" height="16" />
        </div>
      </v-row>

      <div class="subtitles flex d-flex px-4 text-left">
        <div class="orignal-subtitle white--text large">
          All of our exchanges are by dark light, I just realised
        </div>
        <div class="translated-subtitle yellow--text medium mt-2">
          Todas os nossos encontros são à luz de velas, eu acabei de perceber
        </div>
      </div>

      <div class="footer-challenge">
        <v-row class="progress-bar flex-wrap flex-grow-0 flex-shrink-0">
          <v-col cols="12" gap="30">
            <v-btn
              class="mr-2"
              width="32"
              height="32"
              color="main-red"
              fab
              depressed
            >
              <img src="@/assets/cross.svg" width="16" height="16" />
            </v-btn>
            <v-btn
              class="mr-2"
              width="32"
              height="32"
              color="main-green"
              fab
              depressed
            >
              <img src="@/assets/check.svg" width="16" height="16" />
            </v-btn>
            <v-btn
              class="mr-2"
              width="32"
              height="32"
              color="gray-3"
              fab
              depressed
            >
              <img src="@/assets/song.svg" width="16" height="16" />
            </v-btn>
            <v-btn width="32" height="32" color="gray-3" fab depressed>
              <img src="@/assets/song.svg" width="16" height="16" />
            </v-btn>
          </v-col>
          <v-col class="pa-0" cols="12">
            <v-progress-linear
              color="dark-orange"
              rounded
              background-color="white"
              background-opacity="1"
              :value="time / 100"
            ></v-progress-linear>
          </v-col>
        </v-row>

        <v-row class="user-input flex-wrap flex-grow-0 flex-shrink-0 mt-3">
          <component :is="task" />
        </v-row>
      </div>
    </v-container>
  </div>
</template>
<script>
import MultipleChoice from "@/components/ChallengeTypes/MultipleChoice";
import GapFilling from "@/components/ChallengeTypes/GapFilling";
import BlankFilling from "@/components/ChallengeTypes/BlankFilling";
import Speaking from "@/components/ChallengeTypes/Speaking";

export default {
  name: "SongOverview",

  components: {
    MultipleChoice,
    GapFilling,
    BlankFilling,
    Speaking,
  },

  data() {
    return {
      time: 10000,
    };
  },

  watch: {
    time(val) {
      if (val == 0)
        setTimeout(() => {
          this.time = 10000;
        }, 1000);
    },
  },

  computed: {
    task() {
      return {
        "gap-filling": GapFilling,
        "multiple-choice": MultipleChoice,
        "blank-filling": BlankFilling,
        speaking: Speaking,
      }["speaking"];
    },
  },

  created() {
    setInterval(() => {
      this.time = this.time - 1000;
    }, 1000);
  },
};
</script>
<style scoped>
.challenge-page > * {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.challenge-page {
  background-image: url("../assets/test.png");
  background-color: var(--gray-dark);
  background-position: center;
  background-size: cover;
  background-blend-mode: multiply;
  height: 100vh;
  overflow: hidden;
}
.coins-earned {
  align-items: center;
}
.orignal-subtitle,
.translated-subtitle {
  font-weight: bold;
}
.subtitles {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.progress-bar,
.user-input {
  max-width: 320px;
  width: 100%;
}
.footer-challenge {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
