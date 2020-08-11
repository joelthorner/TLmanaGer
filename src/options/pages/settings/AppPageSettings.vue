<template>
  <div>
    settings page
    <div id="example-2">
      <!-- `greet` is the name of a method defined below -->
      <button v-on:click="greet">Greet</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPageSettings",
  props: {
    chromeData: Object,
  },
  methods: {
    greet: function (event) {
      this.chromeData.logicommerce.background.thumb =
        "https://vuejs.org/images/logo.png";
    },
  },
};
</script>