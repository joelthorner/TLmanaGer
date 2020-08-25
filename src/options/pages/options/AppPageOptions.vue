<template>
  <div class="page-content">
    <div id="options-content">
      <main-title title="OPTIONS"></main-title>

      <ul class="nav">
        <li class="nav-item">
          <router-link to="/options/logicommerce" class="nav-link">
            Logicommerce
            <div class="rippleJS"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/options/fluid-tools" class="nav-link">
            Fluid tools
            <div class="rippleJS"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/options/zendesk" class="nav-link">
            Zendesk
            <div class="rippleJS"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/options/others" class="nav-link">
            Others
            <div class="rippleJS"></div>
          </router-link>
        </li>
      </ul>

      <main-content containerClass="options-container">
        <keep-alive>
          <router-view :key="$route.fullPath" :chromeSync="chromeSync" @savedOptionsParent="savechromeSync"></router-view>
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
  </div>
</template>

<script>
import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";

export default {
  name: "AppPageOptions",
  props: {
    chromeSync: Object,
  },
  components: {
    MainTitle,
    MainContent,
  },
  data() {
    return {
      showSavedOptions: false,
    };
  },
  methods: {
    savechromeSync(value) {
      chrome.storage.sync.set(this.chromeSync, () => {
        this.showSavedOptions = value;
        setTimeout(() => {
          this.showSavedOptions = false;
        }, 2000);
      });
    },
  },
};
</script>