<template>
  <div class="card card-stat-data">
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
export default {
  name: "UserStatDataCard",
  props: {
    statData: Object,
  },
};
</script>
