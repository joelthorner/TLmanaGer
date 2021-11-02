<template>
  <div class="content-title">
    <router-link :to="titleLink" v-if="titleLink.length" class="text-reset">
      {{ title }}
    </router-link>
    <span v-else>{{ title }}</span>
    <small v-if="subtitle.length">{{ subtitle }}</small>
  </div>
</template>

<script>
export default {
  name: "MainTitle",
  props: {
    title: {
      type: String,
      default: "",
    },
    titleLink: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
};
</script>
