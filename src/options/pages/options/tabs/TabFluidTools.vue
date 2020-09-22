<template>
  <div class="tab">
    <div class="inner-text">Eines per desenvolupament de shops basades en Fluid</div>

    <div class="row">
      <div class="col-xs-12 col-lg-6 col-xl-4">
        <default-card
          :chromeSync="chromeSync"
          title="Auto forceview"
          :help="help.autoForceView"
          scope="fluidWebTools"
          itemKey="autoForceView"
          @savedOptions="reciveShowSavedOptions"
        ></default-card>
        <default-card
          :chromeSync="chromeSync"
          title=".igd Flush redis shortcut"
          :help="help.flushRedisIgdDomain"
          scope="fluidWebTools"
          itemKey="flushRedisIgdDomain"
          @savedOptions="reciveShowSavedOptions"
        ></default-card>
        <default-card
          :chromeSync="chromeSync"
          title="Dump auto scroll"
          :help="help.dumpAutoScroll"
          scope="fluidWebTools"
          itemKey="dumpAutoScroll"
          @savedOptions="reciveShowSavedOptions"
        ></default-card>
      </div>
      <!-- <div class="col-xs-12 col-lg-6 col-xl-4"></div> -->
      <!-- <div class="col-xs-12 col-lg-6 col-xl-4"></div> -->
    </div>
  </div>
</template>

<script>
import help from "@/data/helpOptions";
import DefaultCard from "@options/pages/options/cards/DefaultCard";

export default {
  name: "TabFluidTools",
  components: {
    DefaultCard,
  },
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      help,
    };
  },
  methods: {
    reciveShowSavedOptions(value) {
      this.$emit("savedOptionsParent", true);
    },
  },
};
</script>