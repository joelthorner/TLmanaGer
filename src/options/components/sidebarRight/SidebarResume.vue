<template>
  <div class="resume">
    <sidebar-resume-item>
      <a :href="releaseLink" target="_blank" rel="noopener noreferrer">
        <span class="title">VERSION</span>
        <span class="content">{{ getVersion }}</span>
        <span class="icon" v-html="caret"></span>
        <div class="rippleJS"></div>
      </a>
    </sidebar-resume-item>
    <sidebar-resume-item>
      <router-link to="/achievements">
        <span class="title">ACHIEVEMENTS</span>
        <span class="content"
          >{{ currentAchievements }}/{{ totalAchievements }}</span
        >
        <span class="icon" v-html="caret"></span>
        <div class="rippleJS"></div>
      </router-link>
    </sidebar-resume-item>
  </div>
</template>

<script>
import SidebarResumeItem from "@options/components/sidebarRight/SidebarResumeItem";
import { caretSimpleRight as caretSimpleRightIcon } from "@/data/icons";
import getAchievementsMixin from "@mixins/getAchievements";

export default {
  name: "SidebarRightResume",
  props: {
    chromeSync: Object,
  },
  components: {
    SidebarResumeItem,
  },
  mixins: [getAchievementsMixin],
  data() {
    return {
      caret: caretSimpleRightIcon,
    };
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