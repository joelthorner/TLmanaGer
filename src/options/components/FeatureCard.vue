<template>
  <div class="card card-feature h-100">
    <div class="card-body">
      <div class="feature-icon bg-primary mb-3 text-white" v-html="icon"></div>
      <div class="card-title">{{ title }}</div>

      <p class="card-text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureCard",
  props: {
    icon: String,
    title: String,
    text: String,
  },
};
</script>
