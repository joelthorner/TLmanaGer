<template>
  <div class="page-content">
    <main-title title="Achievements"></main-title>

    <main-content containerClass="achievements-container">
      <div class="inner-text">
        You have unlocked
        <span
          >{{ currentAchievements }}/{{ totalAchievements }} ({{
            earnedPercent | round
          }}%)</span
        >
      </div>

      <div class="achievements-grid">
        <achievements-card
          v-for="(achievementItem, key) in achievementsData"
          v-bind:key="key"
          :achievement="achievementItem"
          :earned="isEarned(key)"
        ></achievements-card>
      </div>
    </main-content>
  </div>
</template>

<script>
import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import AchievementsCard from "@options/components/AchievementsCard";
import achievements from "@/data/achievements";
import getAchievementsMixin from "@mixins/getAchievements";

import round from "vue-round-filter";

export default {
  name: "AppPageAchievements",
  components: {
    MainTitle,
    MainContent,
    AchievementsCard,
  },
  mixins: [getAchievementsMixin],
  data() {
    return {
      achievementsData: achievements,
    };
  },
  filters: {
    round,
  },
  props: {
    chromeSync: Object,
  },
  methods: {
    isEarned(key) {
      return this.chromeSync.achievements[key].earned;
    },
  },
};
</script>
