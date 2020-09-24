<template>
  <b-modal :ref="thisModalId" :id="thisModalId" scrollable centered v-bind:title="data.title">
    <span class="help-content" v-html="data.content"></span>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right" @click="hideModal">Close</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "HelpModal",
  props: {
    thisModalId: String,
    data: Object,
  },
  methods: {
    hideModal() {
      this.$refs[this.thisModalId].hide();
    },
  },
};
</script>