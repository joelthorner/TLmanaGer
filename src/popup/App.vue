<template>
  <div id="popup">
    <user-header :chromeSync="chromeSync"></user-header>
    <nav-tabs-actions></nav-tabs-actions>
    <ecommerce-info :ecommerceData="ecommerceData"></ecommerce-info>
  </div>
</template>

<script>
import UserHeader from "@popup/components/UserHeader";
import EcommerceInfo from "@popup/components/EcommerceInfo";
import NavTabsActions from "@popup/components/NavTabsActions";

import chromeSync from "@/data/chromeSync";
import watchAchievements from "@mixins/watchAchievements";

import "../scss/popup.scss";

export default {
  name: "App",
  components: {
    UserHeader,
    EcommerceInfo,
    NavTabsActions,
  },
  mixins: [watchAchievements],
  data() {
    return {
      chromeSync: chromeSync,
      ecommerceData: null,
    };
  },
  created() {
    this.getSyncChromeSync();
    this.getEcommerceData();
    this.cleanUpdateAlert();
  },
  methods: {
    cleanUpdateAlert() {
      chrome.browserAction.getBadgeText({}, (result) => {
        if (result === "!") {
          chrome.browserAction.setBadgeText({ text: "" });
          chrome.tabs.create({
            url:
              chrome.extension.getURL("options/options.html") + "#/changelog",
          });
        }
      });
    },

    getEcommerceData() {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id,
            {
              message: "getEcommerceData",
            },
            (response) => {
              if (!window.chrome.runtime.lastError) {
                if (response && response.ecommerceData) {
                  this.ecommerceData = response.ecommerceData;
                }
              } else {
                console.log("Error getting getEcommerceData");
              }
            }
          );
        }
      );
    },

    getSyncChromeSync() {
      chrome.storage.sync.get(chromeSync, (result) => {
        this.chromeSync = result;
      });
    },
  },
};
</script>
