<template>
  <b-modal
    :id="thisModalId"
    size="lg"
    centered
    v-bind:title="title"
    hide-footer
    modal-class="full-image-modal"
  >
    <img :src="sourceUrl" :alt="title" />
  </b-modal>
</template>

<script>
export default {
  name: "FullImageModal",
  props: {
    thisModalId: String,
    sourceUrl: String,
    title: String,
  },
};
</script>