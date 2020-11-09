<template>
  <div class="blank-filling d-flex mb-5">
    <input
      placeholder="O que foi cantado?"
      class="input-blank-filling regular"
      type="text"
    />
    <v-btn
      depressed
      height="32"
      width="59"
      color="main-green white--text"
      class="reset-text-transform ml-2"
      >Enviar</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "BlankFilling",
  data() {
    return {
      answer: "",
    };
  },
};
</script>
<style scoped>
.blank-filling {
  width: 100%;
}
.input-blank-filling {
  flex: 1 1 auto;
  border-radius: 4px;
  background: var(--gray-5);
  height: 32px;
  border: 1px solid var(--main-yellow);
  color: var(--gray-dark);
  padding-left: 4px;
}
</style>
