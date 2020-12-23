<template>
  <div id="layout" @click="layoutClickHandler">
    <sidebar-left :chromeSync="chromeSync"></sidebar-left>

    <main :class="mainClass">
      <keep-alive>
        <router-view :chromeSync="chromeSync"></router-view>
      </keep-alive>
    </main>

    <sidebar-right className="aside-home" v-if="showAsideRight">
      <sidebar-resume :chromeSync="chromeSync"></sidebar-resume>
      <sidebar-contributors></sidebar-contributors>
    </sidebar-right>
  </div>
</template>

<script>
import SidebarLeft from "@options/components/sidebarLeft/SidebarLeft";

import SidebarRight from "@options/components/sidebarRight/SidebarRight";
import SidebarResume from "@options/components/sidebarRight/SidebarResume";
import SidebarContributors from "@options/components/sidebarRight/SidebarContributors";

import chromeSync from "@/data/chromeSync";
import watchArchievements from "@mixins/watchArchievements";

import "../scss/options.scss";

export default {
  name: "App",
  components: {
    SidebarLeft,
    SidebarRight,
    SidebarResume,
    SidebarContributors,
  },
  mixins: [watchArchievements],
  data() {
    return {
      chromeSync: chromeSync,
    };
  },
  created() {
    this.getSyncchromeSync();
    this.googleAccountSync(); // achievement
  },
  computed: {
    showAsideRight() {
      return this.$route.name === "home";
    },
    mainClass() {
      return this.showAsideRight ? "has-aside-right" : "";
    },
  },
  methods: {
    getSyncchromeSync() {
      chrome.storage.sync.get(chromeSync, (result) => {
        this.chromeSync = result;
      });
    },
    layoutClickHandler() {
      this.click500TimesAnything(); // archivement
    },
  },
};
</script>