<template>
  <b-modal
    :id="thisModalId"
    centered
    size="xl"
    hide-footer
    hide-header
    modal-class="full-image-modal"
  >
    <div class="credits">{{ title }}</div>
    <img :src="sourceUrl" :alt="title" class="img-fluid" />
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