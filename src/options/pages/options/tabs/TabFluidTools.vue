<template>
  <div class="tab">
    <div class="inner-text">Eines per desenvolupament de shops basades en Fluid</div>

    <div class="row">
      <div class="col default-options-col-grid">
        <default-card
          :chromeSync="chromeSync"
          title="Auto forceview"
          scope="fluidWebTools"
          itemKey="autoForceView"
          @savedOptions="reciveShowSavedOptions"
          @savedHelpKey="reciveHelpKey"
        ></default-card>
        <default-card
          :chromeSync="chromeSync"
          title=".igd Flush redis shortcut"
          scope="fluidWebTools"
          itemKey="flushRedisIgdDomain"
          @savedOptions="reciveShowSavedOptions"
          @savedHelpKey="reciveHelpKey"
        ></default-card>
        <default-card
          :chromeSync="chromeSync"
          title="Dump auto scroll"
          scope="fluidWebTools"
          itemKey="dumpAutoScroll"
          @savedOptions="reciveShowSavedOptions"
          @savedHelpKey="reciveHelpKey"
        ></default-card>
      </div>
      <!-- <div class="col-xs-12 col-lg-6 col-xl-4"></div> -->
      <!-- <div class="col-xs-12 col-lg-6 col-xl-4"></div> -->
    </div>
  </div>
</template>

<script>
import DefaultCard from "@options/pages/options/cards/DefaultCard";

export default {
  name: "TabFluidTools",
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