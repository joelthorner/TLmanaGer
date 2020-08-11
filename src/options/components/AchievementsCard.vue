<template>
  <div
    v-bind:class="[earned ? 'active' : '', 'card']"
    data-tilt
    data-tilt-reverse="true"
    data-tilt-max="15"
  >
    <div class="content card-body">
      <div class="hexagon">
        <img class="img-fluid" :src="achievement.img" :alt="achievement.name" />
      </div>

      <div class="card-title name">{{ achievement.name }}</div>
      <p class="card-text desc">
        <small class="text-muted">{{ achievement.desc }}</small>
      </p>
      <!-- <div class="rippleJS"></div> -->
    </div>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";

export default {
  name: "AchievementsCard",
  props: {
    earned: Boolean,
    achievement: Object,
  },
  data() {
    return {};
  },
  mounted() {
    VanillaTilt.init(this.$el, {
      // max: 25,
      // speed: 400
    });
  },
};
</script>
