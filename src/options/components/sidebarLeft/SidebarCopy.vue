<template>
  <div class="copy-container">
    <a
      href="https://github.com/joelthorner/TLmanaGer/blob/master/PRIVACY_POLICY.md#pol%C3%ADtica-de-privacidad"
      target="_blank"
      rel="noopener noreferrer"
      v-on:click="setAchievement()"
    >
      Privacy Policy
      <div class="rippleJS"></div>
    </a>

    <div class="copy-text">© TLmanaGer {{ thisYear }}</div>
  </div>
</template>

<script>
import watchAchievements from "@mixins/watchAchievements";

export default {
  name: "SidebarCopy",
  props: {
    chromeSync: Object,
  },
  computed: {
    thisYear: () => {
      return new Date().getFullYear();
    },
  },
  mixins: [watchAchievements],
  methods: {
    setAchievement() {
      this.clickLegalsLink(); // achievement
    },
  },
};
</script>
