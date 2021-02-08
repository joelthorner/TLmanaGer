<template>
  <div class="page-content">
    <background-widget></background-widget>

    <main-title title="Last news!"></main-title>

    <main-content containerClass="home-last-posts">
      <last-posts></last-posts>
    </main-content>
  </div>
</template>

<script>
import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import BackgroundWidget from "@options/pages/home/BackgroundWidget";
import LastPosts from "@options/pages/home/LastPosts";

export default {
  name: "AppPageHome",
  components: {
    MainTitle,
    MainContent,
    BackgroundWidget,
    LastPosts,
  },
  props: {
    chromeSync: Object,
  },
};
</script>