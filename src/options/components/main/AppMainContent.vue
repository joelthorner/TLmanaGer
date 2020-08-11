<template>
  <main>
    <main-top-bar></main-top-bar>
    <router-view :chromeData="chromeData"></router-view>
  </main>
</template>

<script>
import MainTopBar from "./MainTopBar.vue";

export default {
  name: "AppMainContent",
  components: {
    MainTopBar,
  },
  props: {
    chromeData: Object,
  },
};
</script>
