<template>
  <div id="layout" class="d-flex">
    <app-sidebar :chromeData="chromeData"></app-sidebar>
    <app-main-content :chromeData="chromeData"></app-main-content>
    <app-debug :chromeData="chromeData"></app-debug>
  </div>
</template>

<script>
import AppSidebar from "./components/sidebar-left/AppSidebar.vue";
import AppMainContent from "./components/main/AppMainContent.vue";
import AppDebug from "./debug/AppDebug.vue";
import { chromeData } from "./../data.js";
import "../scss/options.scss";

export default {
  name: "App",
  components: {
    AppDebug,
    AppSidebar,
    AppMainContent,
  },
  data() {
    return {
      chromeData: chromeData,
    };
  },
  created() {
    this.getSyncChromeData();
  },
  methods: {
    getSyncChromeData: function () {
      chrome.storage.sync.get(chromeData, (result) => {
        this.chromeData = result;
      });
    },
  },
};
</script>