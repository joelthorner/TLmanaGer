<template>
  <div class="tab">
    <b-tabs pills vertical>
      <b-tab title="Tab 1" active>Tab contents 1</b-tab>
      <b-tab title="Tab 2">Tab contents 2</b-tab>
      <b-tab title="Tab 3">Tab contents 3</b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "TabAvatar",
  props: {
    chromeSync: Object,
  },
  methods: {
    reciveShowSavedOptions() {
      this.$emit("savedOptionsParent", true);
    },
  },
};
</script>