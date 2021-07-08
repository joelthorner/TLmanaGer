<template>
  <div class="header">
    <a :href="profileLink" title="Edit avatar" target="_blank">
      <img :src="chromeSync.profile.avatar.value" alt="Profile avatar" />
    </a>
    <div class="titles">
      <b class="title">TLmanaGer</b>
      <span class="user"
        >Welcome, <span class="user-name">{{ userName }}</span></span
      >
    </div>
    <button type="button" class="options-btn" v-html="settingsIcon"></button>
  </div>
</template>

<script>
import { settings as settingsIcon } from "@/data/icons";

export default {
  name: "UserHeader",
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      defaultUserName: "John Doe",
      settingsIcon: settingsIcon,
    };
  },
  computed: {
    userName() {
      return this.chromeSync.profile.shopTestingUsername.value.length
        ? this.chromeSync.profile.shopTestingUsername.value
        : this.defaultUserName;
    },
    profileLink() {
      return chrome.extension.getURL("options/options.html") + "#/user/avatar";
    },
  },
};
</script>
