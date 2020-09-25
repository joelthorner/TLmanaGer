<template>
  <div>
    <p>Hello world!</p>
    {{ecommerceData}}
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
      ecommerceData: null,
    };
  },
  created() {
    this.getSyncchromeSync();

    this.ecommerceData = chrome.extension
      .getBackgroundPage()
      .localStorage.getItem("ecommerceData");
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
