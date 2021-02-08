<template>
  <div class="tab">
    <div class="inner-text">Other options</div>

    <div class="row">
      <div class="col default-options-col-grid">
        <default-card
          :chromeSync="chromeSync"
          title="Get font awesome icon code"
          scope="others"
          itemKey="getFontWesomeIcons"
          @savedOptions="reciveShowSavedOptions"
          @savedHelpKey="reciveHelpKey"
        ></default-card>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultCard from "@options/pages/options/cards/DefaultCard";

export default {
  name: "TabOthers",
  components: {
    DefaultCard,
  },
  props: {
    chromeSync: Object,
  },
  methods: {
    reciveShowSavedOptions(value) {
      this.$emit("savedOptionsParent", true);
    },
    reciveHelpKey(value) {
      this.$emit("savedHelpKeyParent", value);
    },
  },
};
</script>