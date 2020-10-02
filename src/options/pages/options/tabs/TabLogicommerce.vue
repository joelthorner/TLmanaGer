<template>
  <div class="tab">
    <div class="inner-text">Opcions de personalització de logicommerce, fons, themes, millores...</div>

    <div class="grid-cards-tab grid-cards-logicommerce">
      <default-card
        :chromeSync="chromeSync"
        title="Developer bar"
        scope="logicommerce"
        itemKey="developerBar"
        @savedOptions="reciveShowSavedOptions"
        @savedHelpKey="reciveHelpKey"
      ></default-card>
      <default-card
        :chromeSync="chromeSync"
        title="Sandbox login buttons"
        scope="logicommerce"
        itemKey="sandboxLoginButtons"
        @savedOptions="reciveShowSavedOptions"
        @savedHelpKey="reciveHelpKey"
      ></default-card>
      <pages-window-better-card
        :chromeSync="chromeSync"
        title="Pages window better"
        scope="logicommerce"
        itemKey="pagesWindowBetter"
        @savedOptions="reciveShowSavedOptions"
        @savedHelpKey="reciveHelpKey"
      ></pages-window-better-card>
      <beyond-theme-card
        :chromeSync="chromeSync"
        title="Beyond theme"
        scope="logicommerce"
        itemKey="beyondTheme"
        @savedOptions="reciveShowSavedOptions"
        @savedHelpKey="reciveHelpKey"
      ></beyond-theme-card>
      <logicommerce-background-card
        :chromeSync="chromeSync"
        title="Logicommerce background"
        scope="logicommerce"
        itemKey="background"
        @savedOptions="reciveShowSavedOptions"
        @savedHelpKey="reciveHelpKey"
      ></logicommerce-background-card>
    </div>
  </div>
</template>

<script>
import DefaultCard from "@options/pages/options/cards/DefaultCard";
import BeyondThemeCard from "@options/pages/options/cards/BeyondThemeCard";
import LogicommerceBackgroundCard from "@options/pages/options/cards/LogicommerceBackgroundCard";
import PagesWindowBetterCard from "@options/pages/options/cards/PagesWindowBetterCard";

export default {
  name: "TabLogicommerce",
  components: {
    DefaultCard,
    BeyondThemeCard,
    LogicommerceBackgroundCard,
    PagesWindowBetterCard,
  },
  props: {
    chromeSync: Object,
  },
  mounted() {
    const numCols = 2;
    const colHeights = Array(numCols).fill(0);
    const container = document.querySelector(".grid-cards-tab");
    Array.from(container.children).forEach((child, i) => {
      const order = i % numCols;
      child.style.order = order;
      colHeights[order] += parseFloat(child.clientHeight);
    });
    container.style.height = Math.max(...colHeights) + "px";
    Array.from(container.children).forEach((child, i) => {
      child.style.order = '';
    });
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