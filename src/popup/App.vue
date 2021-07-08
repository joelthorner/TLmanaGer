<template>
  <div id="popup">
    <user-header :chromeSync="chromeSync"></user-header>
    <ecommerce-info :ecommerceData="ecommerceData"></ecommerce-info>
  </div>
</template>

<script>
import UserHeader from "@popup/components/UserHeader";
import EcommerceInfo from "@popup/components/EcommerceInfo";

import chromeSync from "@/data/chromeSync";
import watchAchievements from "@mixins/watchAchievements";

import "../scss/popup.scss";

export default {
  name: "App",
  components: {
    UserHeader,
    EcommerceInfo,
  },
  mixins: [watchAchievements],
  data() {
    return {
      chromeSync: chromeSync,
      ecommerceData: null,
    };
  },
  created() {
    this.getSyncchromeSync();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          message: "getEcommerceData",
        },
        (response) => {
          if (response && response.ecommerceData) {
            this.ecommerceData = response.ecommerceData;
          }
        }
      );
    });
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
