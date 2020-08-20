<template>
  <aside class="aside-right">
    <div class="resume">
      <sidebar-right-resume-item>
        <a :href="releaseLink" target="_blank" rel="noopener noreferrer">
          <span class="title">VERSION</span>
          <span class="content">{{ getVersion }}</span>
          <span class="icon" v-html="caret"></span>
          <div class="rippleJS"></div>
        </a>
      </sidebar-right-resume-item>
      <sidebar-right-resume-item>
        <router-link to="/achievements">
          <span class="title">ACHIEVEMENTS</span>
          <span class="content">{{ currentAchievements }}/{{ totalAchievements }}</span>
          <span class="icon" v-html="caret"></span>
          <div class="rippleJS"></div>
        </router-link>
      </sidebar-right-resume-item>
    </div>

    <sidebar-right-contributors></sidebar-right-contributors>
  </aside>
</template>

<script>
import SidebarRightResumeItem from "@options/pages/home/sidebar-right/SidebarRightResumeItem";
import SidebarRightContributors from "@options/pages/home/sidebar-right/SidebarRightContributors";
import { achievements } from "@/data";
import icons from "@/icons";
import getArchievementsMixin from "@options/mixins/getArchievements";

export default {
  name: "SidebarRight",
  props: {
    chromeData: Object,
  },
  mixins: [getArchievementsMixin],
  data: () => {
    return {
      version: "1.0.0",
      caret: icons.caretRight,
    };
  },
  components: {
    SidebarRightResumeItem,
    SidebarRightContributors,
  },
  computed: {
    getVersion() {
      return chrome.runtime.getManifest().version;
    },
    releaseLink() {
      return `https://github.com/joelthorner/TLmanaGer/releases/tag/v${this.getVersion}`;
    },
  },
};
</script>