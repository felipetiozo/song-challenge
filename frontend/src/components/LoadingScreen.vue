<template>
  <div class="loading-screen">
    <div class="ripple-effect">
      <img src="@/assets/loading.svg" width="105" height="105" />
      <div></div>
      <div></div>
    </div>
    <h1 class="large main-green--text px-4 mt-5">
      {{ message }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: {
    message: {
      type: String,
    },
  },
};
</script>
<style scoped>
.loading-screen {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: var(--gray-1);
  height: 100vh;
  overflow: hidden;
}
.ripple-effect img {
  position: absolute;
  top: 50%;
  margin-top: -52.5px;
  left: 50%;
  margin-left: -52.5px;
}
.ripple-effect {
  display: inline-block;
  position: relative;
  width: 320px;
  height: 320px;
}
.ripple-effect div {
  position: absolute;
  border: 1px solid var(--main-green);
  opacity: 1;
  border-radius: 50%;
  animation: ripple-effect 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.ripple-effect div:nth-child(2) {
  border-color: var(--gray-2);
  animation-delay: -1s;
}
@keyframes ripple-effect {
  0% {
    top: 50%;
    margin-top: -52.5px;
    margin-left: -52.5px;
    left: 50%;
    width: 105px;
    height: 105px;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 320px;
    height: 320px;
    opacity: 0;
  }
}
</style>
