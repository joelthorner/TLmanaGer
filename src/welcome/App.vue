<template>
  <div
    id="welcome"
    @click="layoutClickHandler"
    v-bind:style="{
      backgroundImage: 'url(' + getBackgroundImage + ')',
    }"
  >
    <div class="bg">
      <div class="center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M417.854 153.285c-5.479-28.378-21.693-52.948-45.637-69.114-17.998-12.18-38.92-18.608-60.565-18.608-36.043 0-69.58 17.805-89.747 47.581L110.753 277.549C94.556 301.508 88.658 330.32 94.15 358.73c5.479 28.379 21.694 52.938 45.641 69.104 17.979 12.195 38.92 18.607 60.563 18.607 36.027 0 69.563-17.809 89.715-47.602L401.22 234.467c16.228-23.991 22.109-52.787 16.634-81.182zm-157.64 225.307a72.165 72.165 0 0 1-59.858 31.77c-14.396 0-28.378-4.307-40.35-12.402-15.957-10.781-26.771-27.145-30.438-46.086-3.664-18.934.289-38.137 11.072-54.072l56.171-82.985L316.334 295l-56.12 83.592z"
          />
        </svg>
        <h1>TLmanaGer</h1>

        <b-button pill variant="light" :href="link" block size="lg"
          >Let's start!</b-button
        >
      </div>
    </div>
  </div>
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
  computed: {
    link() {
      return chrome.extension.getURL("options/options.html");
    },
    getBackgroundImage() {
      return chrome.extension.getURL("img/welcome.jpg");
    },
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
