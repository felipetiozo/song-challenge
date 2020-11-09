<template>
  <v-col class="py-0" cols="12">
    <v-btn
      v-for="option in options"
      :key="option"
      color="white medium-orange--text mb-2 reset-text-transform"
      height="40"
      width="100%"
    >
      {{ option }}
    </v-btn>
  </v-col>
</template>

<script>
export default {
  name: "MultipleChoice",
  data() {
    return {
      options: ["Dark", "Rose", "Candle", "Ship"],
    };
  },
};
</script>
