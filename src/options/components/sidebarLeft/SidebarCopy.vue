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
import watchArchievements from "@mixins/watchArchievements";

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
  mixins: [watchArchievements],
  methods: {
    setAchievement() {
      this.clickLegalsLink(); // archivement
    },
  },
};
</script>