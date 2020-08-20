<template>
  <div id="layout" class="d-flex">
    <app-sidebar :chromeData="chromeData"></app-sidebar>
    <app-main-content :chromeData="chromeData"></app-main-content>
    <app-debug :chromeData="chromeData"></app-debug>
  </div>
</template>

<script>
import AppSidebar from "@options/components/sidebar-left/AppSidebar";
import AppMainContent from "@options/components/main/AppMainContent";
import AppDebug from "@options/debug/AppDebug";

import { chromeData, achievements } from "@/data";
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