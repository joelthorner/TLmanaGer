<template>
  <div class="page-content">
    <user-background :chromeSync="chromeSync"></user-background>
    <user-nav :chromeSync="chromeSync"></user-nav>

    <main-content containerClass="user-container">
      <keep-alive>
        <router-view
          :key="$route.fullPath"
          :chromeSync="chromeSync"
          @savedOptionsParent="savechromeSync"
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
</template>

<script>
import UserBackground from "@options/pages/user/UserBackground";
import UserNav from "@options/pages/user/UserNav";
import MainContent from "@options/components/main/MainContent";

export default {
  name: "AppPageUser",
  data() {
    return {
      showSavedOptions: false,
    };
  },
  components: {
    UserBackground,
    UserNav,
    MainContent,
  },
  props: {
    chromeSync: Object,
  },
  methods: {
    savechromeSync(value) {
      chrome.storage.sync.set(this.chromeSync, () => {
        this.showSavedOptions = value;

        // here future archivement user opts

        setTimeout(() => {
          this.showSavedOptions = false;
        }, 2000);
      });
    },
  },
};
</script>
