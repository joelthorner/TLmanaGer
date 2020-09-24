<template>
  <div>
    <p>Hello world!</p>
  </div>
</template>

<script>
import chromeSync from "@/data/chromeSync";
import watchArchievements from "@mixins/watchArchievements";

import "../scss/popup.scss";

export default {
  mixins: [watchArchievements],
  data() {
    return {
      chromeSync: chromeSync,
    };
  },
  created() {
    this.getSyncchromeSync();
  },
  methods: {
    getSyncchromeSync() {
      chrome.storage.sync.get(chromeSync, (result) => {
        this.chromeSync = result;
      });
    },
  },
};
</script>
