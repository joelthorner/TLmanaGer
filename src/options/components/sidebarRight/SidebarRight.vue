<template>
  <aside :class="'aside-right ' + className">
    <slot></slot>
  </aside>
</template>

<script>


export default {
  name: "SidebarRight",
  props: {
    className: String,
  },
};
</script>