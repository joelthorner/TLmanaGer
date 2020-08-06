<template>
  <main>
    <app-top-bar></app-top-bar>
    <router-view></router-view>
  </main>
</template>

<script>
import AppTopBar from "./AppTopBar.vue";

export default {
  name: "AppMainContent",
  components: {
    AppTopBar,
  },
};
</script>

<style lang="scss">
</style>