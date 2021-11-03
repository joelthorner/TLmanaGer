<template>
  <div id="welcome" @click="layoutClickHandler"></div>
</template>

<script>
import chromeSync from "@/data/chromeSync";
import watchAchievements from "@mixins/watchAchievements";

import "../scss/welcome.scss";

export default {
  name: "App",
  components: {},
  mixins: [watchAchievements],
  data() {
    return {
      chromeSync: chromeSync,
    };
  },
  created() {
    this.getSyncChromeSync();
  },
  methods: {
    getSyncChromeSync() {
      chrome.storage.sync.get(chromeSync, (result) => {
        this.chromeSync = result;
      });
    },

    layoutClickHandler() {
      this.click500TimesAnything(); // achievement
    },
  },
};
</script>
