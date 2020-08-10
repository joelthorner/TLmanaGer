<template>
  <aside class="aside-left">
    <sidebar-logo></sidebar-logo>
    <sidebar-menu></sidebar-menu>
    <sidebar-footer-block
      v-for="(footerBlock, index) in footerBlocks"
      v-bind:key="index"
      :title="footerBlock.title"
      :items="footerBlock.items"
			:chromeData="chromeData"
    ></sidebar-footer-block>
		<sidebar-copy></sidebar-copy>
  </aside>
</template>

<script>
import SidebarLogo from "./SidebarLogo.vue";
import SidebarMenu from "./SidebarMenu.vue";
import SidebarFooterBlock from "./SidebarFooterBlock.vue";
import SidebarCopy from "./SidebarCopy.vue";

import { icons } from "./../../../data.js";

export default {
  name: "AppSiderbar",
  components: {
    SidebarLogo,
    SidebarMenu,
    SidebarFooterBlock,
    SidebarCopy,
	},
	props: {
    chromeData: Object,
  },
  data: () => {
    return {
      footerBlocks: [
        {
          title: "GITHUB",
          items: [
            {
							id: 'project',
              title: "Project",
              icon: icons.github,
              route: "https://github.com/joelthorner/TLmanaGer",
						},
						{
							id: 'issues',
              title: "Issues",
              icon: icons.bug,
              route: "https://github.com/joelthorner/TLmanaGer/issues",
            },
          ],
        },
      ],
    };
  },
};
</script>