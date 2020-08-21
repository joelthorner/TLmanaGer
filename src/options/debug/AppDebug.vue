<template>
  <div class="debug" v-if="debug">
    <button class="btn btn-secondary" v-on:click="reset">clear storage</button>
  </div>
</template>

<script>
export default {
  name: "AppDebug",
  props: {
    chromeSync: Object,
    loadedchromeSync: Boolean,
  },
  created() {
    this.isDebug();
  },
  data() {
    return {
      debug: false,
    };
  },
  methods: {
    isDebug: function () {
      const queryString = window.location.href;
      if (queryString.includes("debug=1")) {
        this.debug = true;
      }
    },
    reset: function () {
      chrome.storage.sync.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
        console.log("reset");
      });
    },
  },
};
</script>