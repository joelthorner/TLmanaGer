<script>
export default {
  name: "StyleTag",
  render: function (createElement) {
    return createElement("style", this.$slots.default);
  },
};
</script>
