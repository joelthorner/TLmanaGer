<template>
  <div class="content-title">{{ title }}</div>
</template>

<script>
export default {
  name: "MainTitle",
  props: {
    title: String,
  },
};
</script>