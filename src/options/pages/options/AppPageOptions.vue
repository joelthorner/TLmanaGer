<template>
  <div class="page-content">
    <div id="options-content">
      <main-title title="OPTIONS"></main-title>

      <options-nav></options-nav>

      <main-content containerClass="options-container">
        <keep-alive>
          <router-view
            :key="$route.fullPath"
            :chromeSync="chromeSync"
            @savedOptionsParent="savechromeSync"
            @savedHelpKeyParent="sendHelpKey"
          ></router-view>
        </keep-alive>
      </main-content>

      <b-toast
        title="Saved options"
        no-auto-hide
        toaster="b-toaster-bottom-center"
        :visible="showSavedOptions"
        no-close-button
      ></b-toast>
    </div>

    <help-modal
      :dataKey="clickedHelpDataKey"
    ></help-modal>
  </div>
</template>

<script>
import watchArchievements from "@mixins/watchArchievements";

import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import OptionsNav from "@options/pages/options/OptionsNav";
import HelpModal from "@options/components/HelpModal";

export default {
  name: "AppPageOptions",
  props: {
    chromeSync: Object,
  },
  components: {
    MainTitle,
    MainContent,
    OptionsNav,
    HelpModal,
  },
  mixins: [watchArchievements],
  data() {
    return {
      showSavedOptions: false,
      clickedHelpDataKey: "",
    };
  },
  methods: {
    sendHelpKey(value) {
      this.clickedHelpDataKey = value;
    },
    savechromeSync(value) {
      chrome.storage.sync.set(this.chromeSync, () => {
        this.showSavedOptions = value;

        this.activeAllOpts(); // archivement
        this.activeAllZenOpts(); // archivement

        setTimeout(() => {
          this.showSavedOptions = false;
        }, 2000);
      });
    },
  },
};
</script>