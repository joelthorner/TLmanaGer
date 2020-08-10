<template>
  <div v-bind:class="[earned ? 'active' : '', 'card']" data-tilt data-tilt-reverse="true" data-tilt-max="15">
    <div class="content card-body">
      <div class="hexagon">
        <img class="img-fluid" :src="archivement.img" :alt="archivement.name" />
      </div>

      <div class="card-title name">{{ archivement.name }}</div>
      <p class="card-text desc">
        <small class="text-muted">{{ archivement.desc }}</small>
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
    archivement: Object,
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
