<template>
  <main>
    <app-top-bar></app-top-bar>

    <div id="content">
      <router-view></router-view>
    </div>
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