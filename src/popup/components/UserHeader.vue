<template>
  <div class="header">
    <a :href="profileLink" title="Edit avatar" target="_blank" class="avatar">
      <img :src="chromeSync.profile.avatar.value" alt="Profile avatar" />
      <span class="icon hover" v-html="penIcon"></span>
      <div class="rippleJS"></div>
    </a>
    <div class="titles">
      <b class="title">TLmanaGer</b>
      <span class="user"
        >Welcome, <span class="user-name">{{ userName }}</span></span
      >
    </div>
    <a
      :href="optionsLink"
      class="options-btn"
      title="Open settings"
      target="_blank"
    >
      <span v-html="settingsIcon"></span>
      <div class="rippleJS"></div>
    </a>
  </div>
</template>

<script>
import { settings as settingsIcon, pen as penIcon } from "@/data/icons";

export default {
  name: "UserHeader",
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      defaultUserName: "John Doe",
      settingsIcon: settingsIcon,
      penIcon: penIcon,
    };
  },
  computed: {
    userName() {
      return this.chromeSync.profile.shopTestingUsername.value.length
        ? this.chromeSync.profile.shopTestingUsername.value
        : this.defaultUserName;
    },
    optionsLink() {
      return chrome.extension.getURL("options/options.html") + "#/options";
    },
    profileLink() {
      return chrome.extension.getURL("options/options.html") + "#/user/avatar";
    },
  },
};
</script>
