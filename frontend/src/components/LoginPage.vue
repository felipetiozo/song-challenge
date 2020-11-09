<template>
  <div class="login-page semi-black">
    <div class="login-page-title">
      <h1 class="main-green--text medium">
        Faça o login no Spotify e troque suas moedas por prêmios
      </h1>
    </div>

    <div class="rewards main-green"></div>

    <v-row class="login-options flex-wrap flex-grow-0 flex-shrink-0 pb-5">
      <v-col cols="12">
        <SpotifyLoginButton @click.native="$router.push('/challenge/1234')" />
      </v-col>
      <v-col class="py-0" cols="12">
        <v-btn
          @click="$emit('cancel')"
          depressed
          color="transparent white--text reset-text-transform"
          height="40"
          width="100%"
          max-width="264"
        >
          Continuar sem logar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import SpotifyLoginButton from "@/components/LoginButtons/Spotify";
export default {
  name: "LoginPage",

  components: {
    SpotifyLoginButton,
  },
};
</script>

<style scoped>
.login-page-title {
  height: 95px;
  display: flex;
  align-items: center;
}
</style>
