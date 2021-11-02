<template>
  <div v-bind:class="[earned ? 'active' : '', 'card', 'card-achievement']">
    <div class="content card-body">
      <div class="hexagon">
        <img class="img-fluid" :src="achievement.img" :alt="achievement.name" />
      </div>

      <div class="card-title name">{{ achievement.name }}</div>
      <p class="card-text desc">
        <small class="text-muted">{{ achievement.desc }}</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AchievementsCard",
  props: {
    earned: Boolean,
    achievement: Object,
  },
};
</script>
