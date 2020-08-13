<template>
  <div class="white-block contributors">
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SidebarRightBlock",
  props: {
    title: String,
  },
};
</script>