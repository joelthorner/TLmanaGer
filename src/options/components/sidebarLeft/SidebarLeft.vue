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
    <sidebar-copy :chromeSync="chromeSync"></sidebar-copy>
  </aside>
</template>

<script>
import SidebarLogo from "@options/components/sidebarLeft/SidebarLogo";
import SidebarMenu from "@options/components/sidebarLeft/SidebarMenu";
import SidebarFooterBlock from "@options/components/sidebarLeft/SidebarFooterBlock";
import SidebarCopy from "@options/components/sidebarLeft/SidebarCopy";

import { github as githubIcon, bug as bugIcon } from "@/data/icons";

export default {
  name: "SidebarLeft",
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
          title: "Github",
          items: [
            {
              id: "project",
              title: "Project",
              icon: githubIcon,
              route: "https://github.com/joelthorner/TLmanaGer",
            },
            {
              id: "issues",
              title: "Issues",
              icon: bugIcon,
              route: "https://github.com/joelthorner/TLmanaGer/issues",
            },
          ],
        },
      ],
    };
  },
};
</script>