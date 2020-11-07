<template>
  <v-container class="song-overview-page">
    <v-row>
      <v-btn icon>
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "SongOverview",
};
</script>
<style scoped>
.song-overview-page {
  background: #424b54;
  min-height: 100vh;
}
</style>
