<template>
  <b-modal
    ref="options-help-modal"
    id="options-help-modal"
    scrollable
    centered
    v-bind:title="thisData.title"
  >
    <span class="help-content" v-html="thisData.content"></span>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right" @click="hideModal"
          >Close</b-button
        >
      </div>
    </template>
  </b-modal>
</template>

<script>
import help from "@/data/helpOptions";

export default {
  name: "HelpModal",
  props: {
    dataKey: "",
  },
  data() {
    return {
      help,
    };
  },
  methods: {
    hideModal() {
      this.$refs[this.thisModalId].hide();
    },
  },
  computed: {
    thisData() {
      return this.help[this.dataKey] ?? {};
    },
  },
};
</script>