<template>
  <main>
    <transition name="bounce">
      <LoadingScreen
        message="Buscando uma música especialmente para você..."
        v-if="loading"
      />
    </transition>
    <div
      class="song-overview-page"
      :style="{
        backgroundImage:
          'url(https://i.scdn.co/image/ab67616d0000b2739c284a6855f4945dc5a3cd73)',
      }"
      v-show="!loading"
    >
      <v-container class="main-container">
        <v-row class="flex-grow-0 flex-shrink-0" no-gutters>
          <v-btn class="text-center" icon>
            <img src="@/assets/times.svg" width="24" height="24" />
          </v-btn>
          <v-spacer></v-spacer>
        </v-row>

        <v-row
          class="white--text flex-wrap flex-grow-0 flex-shrink-0"
          no-gutters
        >
          <v-col cols="12"
            ><span class="regular"><b>Miracle Aligner</b></span></v-col
          >
          <v-col cols="12"
            ><span class="small">The Last Shadow Puppets</span></v-col
          >
        </v-row>

        <div class="flex d-flex impact-phrase">
          <span class="white--text large px-4">
            Quais músicas você escolheria para
            <b>a trilha sonora da sua vida?</b>
          </span>
        </div>

        <v-row class="flex-wrap flex-grow-0 flex-shrink-0">
          <v-col cols="12">
            <v-btn
              color="laranjosa white--text"
              height="40"
              width="100%"
              max-width="290"
              @click="showLoginPage = true"
            >
              <img
                class="mr-4"
                src="@/assets/play.svg"
                width="16"
                height="18"
              />
              Iniciar desafio
            </v-btn>
          </v-col>
          <v-col class="py-0" cols="12">
            <v-btn
              depressed
              color="transparent white--text reset-text-transform"
              height="40"
              width="100%"
              max-width="290"
            >
              Escolher outra música
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <van-dialog v-model="showLoginPage" :showConfirmButton="false">
        <LoginPage @cancel="showLoginPage = false" />
      </van-dialog>
    </div>
  </main>
</template>
<script>
import LoadingScreen from "@/components/LoadingScreen";
import LoginPage from "@/components/LoginPage";
export default {
  name: "SongOverview",

  components: {
    LoadingScreen,
    LoginPage,
  },

  data() {
    return {
      loading: true,
      showLoginPage: false,
    };
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
};
</script>
<style scoped>
.impact-phrase {
  align-items: center;
  justify-content: center;
}
.song-overview-page > .main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.song-overview-page {
  /* background-image: url("../assets/test.png"); */
  background-color: var(--gray-dark);
  background-position: center;
  background-size: cover;
  background-blend-mode: multiply;
  height: 100vh;
  overflow: hidden;
}
</style>
