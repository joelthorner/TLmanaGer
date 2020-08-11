<template>
  <main>
    <main-top-bar></main-top-bar>
		<transition name="page" mode="out-in">
    	<router-view :chromeData="chromeData"></router-view>
		</transition>
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
