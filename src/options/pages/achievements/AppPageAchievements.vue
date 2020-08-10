<template>
  <div class="page-content">
    <div id="achievements-content">
      <main-title title="ACHIEVEMENTS"></main-title>

      <main-content containerClass="achievements-container">
        <div class="inner-text">
          You have unlocked
          <span>{{ currentAchievements }}/{{ totalAchievements }} ({{ earnedPercent | round }}%)</span>
        </div>
        <div class="grid">
          <achievements-card
            v-for="archivement in chromeData.archivements"
            v-bind:key="archivement.name"
            :archivement="archivement"
          ></achievements-card>
        </div>
      </main-content>
    </div>
  </div>
</template>

<script>
import MainTitle from "./../../components/main/MainTitle.vue";
import MainContent from "./../../components/main/MainContent.vue";
import AchievementsCard from "./../../components/AchievementsCard.vue";

import round from "vue-round-filter";

export default {
  name: "AppPageAchievements",
  components: {
    MainTitle,
    MainContent,
    AchievementsCard,
  },
  filters: {
    round,
  },
  props: {
    chromeData: Object,
  },
  computed: {
    currentAchievements() {
      let t = 0;
      Object.keys(this.chromeData.archivements).forEach((key) => {
        if (this.chromeData.archivements[key]) t++;
      });
      return t;
    },
    totalAchievements() {
      let key,
        t = 0;
      for (key in this.chromeData.archivements) {
        if (this.chromeData.archivements.hasOwnProperty(key)) t++;
      }
      return t;
    },
    earnedPercent() {
      return (this.currentAchievements * 100) / this.totalAchievements;
    },
  },
};
</script>
