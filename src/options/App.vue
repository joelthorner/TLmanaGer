<template>
  <div id="layout" class="d-flex">
    <app-sidebar></app-sidebar>
    <app-main-content></app-main-content>
    <app-sidebar-right></app-sidebar-right>
  </div>
</template>

<script>
import AppSidebar from "./components/sidebar-left/AppSidebar.vue";
import AppMainContent from "./components/main/AppMainContent.vue";

export default {
  name: "App",
  components: {
    AppSidebar,
    AppMainContent,
  },
};
</script>

<style lang="scss">
@import "~bootstrap";
@import "~bootstrap-vue";

$aside-left-width: 212px;
$aside-right-width: 250px;
$top-bar-h: 48px;

$blue-1: #2d3144;
$blue-2: #333a56;
$blue-3: #2d4065;

$title-1: #a9b7c3; // header titles content
$title-2: #686b73; // card dark title
$title-3: #c2c2c2; // aside right title part white

$text-1: #9ea0a6;

$background: #f0f6fb; // global
$background-title: #e1e9f0; // header title content bg
$background-gray-1: #f9f9f9; // aside right bg white part

$logo-blue-start: #00a8ff;
$logo-blue-end: #007aff;

html,
body,
#layout {
  height: 100%;
}

.aside-left {
  width: $aside-left-width;
}

main {
  width: calc(100% - #{$aside-left-width});
  float: left;
  background-color: $background;

  #top-bar {
    height: $top-bar-h;
    background-color: #fff;
  }
}

#home-content {
	width: calc(100% - #{$aside-right-width});
	float: left;
}

.aside-right {
  width: $aside-right-width;
	float: left;
}
</style>
