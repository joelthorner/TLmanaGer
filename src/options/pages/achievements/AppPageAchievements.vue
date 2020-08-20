<template>
  <div class="page-content">
    <div id="achievements-content">
      <main-title title="ACHIEVEMENTS"></main-title>

      <main-content containerClass="achievements-container">
        <div class="inner-text">
          You have unlocked
          <span>{{ currentAchievements }}/{{ totalAchievements }} ({{ earnedPercent | round }}%)</span>
        </div>
        <div class="grid d-flex">
          <achievements-card
            v-for="(achievementItem, key) in achievementsData"
            v-bind:key="key"
            :achievement="achievementItem"
            :earned="isEarned(key)"
          ></achievements-card>
          <div class="card empty" v-for="index in 10" :key="index"></div>
        </div>
      </main-content>
    </div>
  </div>
</template>

<script>
import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";
import AchievementsCard from "./../../components/AchievementsCard.vue";
import { achievements } from "@/data.js";
import getArchievementsMixin from "../../../mixins/getArchievements.js";

import round from "vue-round-filter";

export default {
  name: "AppPageAchievements",
  components: {
    MainTitle,
    MainContent,
    AchievementsCard,
  },
  mixins: [getArchievementsMixin],
  data() {
    return {
      achievementsData: achievements,
    };
  },
  filters: {
    round,
  },
  props: {
    chromeData: Object,
  },
  methods: {
    isEarned(key) {
      return this.chromeData.achievements[key].earned;
    },
    // getAchievementData: function(achievementName) {
    // 	return this.achievements[achievementName];
    // }
  },
};
</script>
