<template>
  <main>
    <!-- <main-top-bar></main-top-bar> -->
    <transition name="page" mode="out-in">
      <router-view :chromeSync="chromeSync"></router-view>
    </transition>
  </main>
</template>

<script>
// import MainTopBar from "@options/components/main/MainTopBar";

export default {
  name: "AppMainContent",
  components: {
    // MainTopBar,
  },
  props: {
    chromeSync: Object,
  },
};
</script>
