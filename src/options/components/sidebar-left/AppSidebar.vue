<template>
  <aside class="aside-left">
    <sidebar-logo></sidebar-logo>
    <sidebar-menu></sidebar-menu>
    <sidebar-footer-block
      v-for="(footerBlock, index) in footerBlocks"
      v-bind:key="index"
      :title="footerBlock.title"
      :items="footerBlock.items"
      :chromeSync="chromeSync"
    ></sidebar-footer-block>
    <sidebar-copy></sidebar-copy>
  </aside>
</template>

<script>
import SidebarLogo from "@options/components/sidebar-left/SidebarLogo";
import SidebarMenu from "@options/components/sidebar-left/SidebarMenu";
import SidebarFooterBlock from "@options/components/sidebar-left/SidebarFooterBlock";
import SidebarCopy from "@options/components/sidebar-left/SidebarCopy";

import icons from "@/icons";

export default {
  name: "AppSiderbar",
  components: {
    SidebarLogo,
    SidebarMenu,
    SidebarFooterBlock,
    SidebarCopy,
  },
  props: {
    chromeSync: Object,
  },
  data: () => {
    return {
      footerBlocks: [
        {
          title: "GITHUB",
          items: [
            {
              id: "project",
              title: "Project",
              icon: icons.github,
              route: "https://github.com/joelthorner/TLmanaGer",
            },
            {
              id: "issues",
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