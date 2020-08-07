<template>
  <main>
    <app-top-bar></app-top-bar>
    <router-view :chromeData="chromeData"></router-view>
  </main>
</template>

<script>
import AppTopBar from "./AppTopBar.vue";

export default {
  name: "AppMainContent",
  components: {
    AppTopBar,
	},
	props: ['chromeData'],
};
</script>

<style lang="scss">
</style>