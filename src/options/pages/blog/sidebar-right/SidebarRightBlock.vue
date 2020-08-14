<template>
  <div :class="'white-block ' + classContainer">
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SidebarRightBlock",
  props: {
    title: String,
    classContainer: String,
  },
};
</script>