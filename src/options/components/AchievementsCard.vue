<template>
  <div
    class="card"
    data-tilt
    data-tilt-reverse="true"
    data-tilt-max-glare="0.9"
    data-tilt-scale="1.05"
  >asd</div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";

export default {
  name: "AchievementsCard",
  props: {
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
  methods: {},
};
</script>