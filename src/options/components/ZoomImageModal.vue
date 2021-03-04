<template>
  <b-modal
    ref="zoom-image-modal"
    id="zoom-image-modal"
    centered
    size="xl"
    hide-footer
    hide-header
  >
    <img v-if="image.length" :src="image" class="img-fluid" />
  </b-modal>
</template>

<script>
export default {
  name: "ZoomImageModal",
  props: {
    image: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    show() {
      this.$refs["zoom-image-modal"].show();
    },
    hide() {
      this.$refs["zoom-image-modal"].hide();
    },
  },
};
</script>