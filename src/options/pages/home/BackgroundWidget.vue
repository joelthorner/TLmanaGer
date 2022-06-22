<template>
  <div class="background-widget">
    <div
      class="image"
      v-bind:style="{
        backgroundImage: 'url(' + getBackgroundImage + ')',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "BackgroundWidget",
  computed: {
    getBackgroundImage() {
      return chrome.runtime.getURL("img/home-bg.jpg");
    },
  },
};
</script>
