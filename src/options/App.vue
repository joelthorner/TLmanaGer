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

import { chromeData, achievements } from "./../data.js";
import watchArchievements from "./../mixins/watchArchievements.js";

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
			chromeData: chromeData,
			achievementsData: achievements,
    };
  },
  created() {
		this.getSyncChromeData();
		this.googleAccountSync(); // achievement
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