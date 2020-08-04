<template>
  <div id="layout" class="d-flex">
    <app-sidebar></app-sidebar>
    <app-main-content></app-main-content>
  </div>
</template>

<script>
import AppSidebar from "./components/sidebar-left/AppSidebar.vue"
import AppMainContent from "./components/main/AppMainContent.vue"
import '../scss/options.scss'


export default {
  name: "App",
  components: {
    AppSidebar,
    AppMainContent,
  },
};
</script>