<template>
  <div>
		<div id="home-content">
			home
		</div>

		<app-sidebar-right></app-sidebar-right>
	</div>
</template>

<script>
import AppSidebarRight from "./sidebar-right/AppSidebarRight.vue";

export default {
	name: "AppPageHome",
	components: {
		AppSidebarRight
	}
};
</script>

<style lang="scss">
</style>