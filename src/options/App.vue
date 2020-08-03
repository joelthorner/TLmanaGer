<template>
  <app-sidebar></app-sidebar>
</template>

<script>
import AppSidebar from "./components/AppSidebar.vue";

export default {
  name: "App",
  components: {
		AppSidebar
	}
};
</script>

<style lang="scss">
@import "~bootstrap";
@import "~bootstrap-vue";
</style>
