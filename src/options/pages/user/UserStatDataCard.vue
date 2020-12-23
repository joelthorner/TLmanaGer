<template>
  <div
    class="card card-stat-data"
    data-tilt
    data-tilt-reverse="true"
    data-tilt-max="15"
  >
    <div class="content card-body">
      <div class="hexagon">
        <span class="icon" v-html="statData.icon"></span>
      </div>

      <div class="card-title name">{{ statData.name }}</div>
      <p class="card-text desc">
        <small class="text-muted">{{ statData.value }}</small>
      </p>
    </div>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";

export default {
  name: "UserStatDataCard",
  props: {
    statData: Object,
  },
  mounted() {
    VanillaTilt.init(this.$el, {
      // max: 25,
      // speed: 400
    });
  },
};
</script>
