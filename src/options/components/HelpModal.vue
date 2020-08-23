<template>
  <b-modal :id="thisModalId" size="lg" centered v-bind:title="data.title">
    <span class="help-content" v-html="data.content"></span>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="primary" class="float-right" @click="show=false">Close</b-button>
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
};
</script>