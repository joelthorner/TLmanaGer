<template>
  <div id="layout" class="d-flex" @click="layoutClickHandler">
    <app-sidebar :chromeSync="chromeSync"></app-sidebar>
    <app-main-content :chromeSync="chromeSync"></app-main-content>
    <app-debug :chromeSync="chromeSync"></app-debug>
  </div>
</template>

<script>
import AppSidebar from "@options/components/sidebar-left/AppSidebar";
import AppMainContent from "@options/components/main/AppMainContent";
import AppDebug from "@options/debug/AppDebug";

import chromeSync from "@/data/chromeSync";
import watchArchievements from "@options/mixins/watchArchievements";

import "../scss/options.scss";

export default {
  name: "App",
  components: {
    AppDebug,
    AppSidebar,
    AppMainContent,
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