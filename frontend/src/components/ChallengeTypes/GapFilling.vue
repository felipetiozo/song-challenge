<template>
  <v-col class="py-0" cols="12">
    <div class="d-flex mb-5 options-blank pb-5">
      <v-btn
        v-for="(option, i) in optionsChoseed"
        :key="option"
        @click="
          optionsToChoose.push(option);
          optionsChoseed.splice(i, 1);
        "
        class="white gray-dark--text mr-2 gap-filling-option pa-0"
        height="40"
        width="32"
      >
        {{ option }}
      </v-btn>

      <div
        v-for="option in optionsToChoose.length"
        :key="option"
        class="mr-2 gap-filling-option-blank"
      ></div>
    </div>
    <div class="options-to-choose">
      <v-btn
        v-for="(option, i) in optionsToChoose"
        :key="option"
        @click="
          optionsChoseed.push(option);
          optionsToChoose.splice(i, 1);
        "
        class="white gray-dark--text mr-2 gap-filling-option pa-0"
        height="40"
        width="32"
      >
        {{ option }}
      </v-btn>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "GapFilling",
  data() {
    return {
      optionsToChoose: ["c", "n", "a", "l", "d", "e"],
      optionsChoseed: [],
    };
  },
};
</script>
<style>
.gap-filling-option {
  text-transform: initial;
  flex: none;
  min-width: 32px !important;
}
.options-blank {
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--gray-3);
}
.options-to-choose {
  height: 40px;
  margin-bottom: 16px;
}
.gap-filling-option-blank {
  width: 32px;
  height: 40px;
  border: 1px solid white;
  border-radius: 6px;
}
</style>
