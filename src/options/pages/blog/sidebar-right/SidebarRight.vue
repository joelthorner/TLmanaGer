<template>
  <aside class="aside-right">
		<!-- archive x years -->
		<!-- tags -->
  </aside>
</template>

<script>
import SidebarRightBlock from "../sidebar-right/SidebarRightBlock.vue";

export default {
	name: "SidebarRight",
	props: {
		items: Array
	},
	components: {
		SidebarRightBlock,
	}
};
</script>
