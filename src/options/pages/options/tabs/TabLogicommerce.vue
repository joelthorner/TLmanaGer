<template>
  <div class="tab">
    <div class="inner-text">Opcions de personalització de logicommerce, fons, themes, millores...</div>

    <div class="grid-cards-tab grid-cards-logicommerce">
      <default-card
        :chromeSync="chromeSync"
        title="Developer bar"
        :help="help.developerBar"
        scope="logicommerce"
        itemKey="developerBar"
        @savedOptions="reciveShowSavedOptions"
      ></default-card>
      <default-card
        :chromeSync="chromeSync"
        title="Sandbox login buttons"
        :help="help.sandboxLoginButtons"
        scope="logicommerce"
        itemKey="sandboxLoginButtons"
        @savedOptions="reciveShowSavedOptions"
      ></default-card>
      <pages-window-better-card
        :chromeSync="chromeSync"
        title="Pages window better"
        :help="help.pagesWindowBetter"
        scope="logicommerce"
        itemKey="pagesWindowBetter"
        @savedOptions="reciveShowSavedOptions"
      ></pages-window-better-card>
      <beyond-theme-card
        :chromeSync="chromeSync"
        title="Beyond theme"
        :help="help.beyondTheme"
        scope="logicommerce"
        itemKey="beyondTheme"
        @savedOptions="reciveShowSavedOptions"
      ></beyond-theme-card>
      <logicommerce-background-card
        :chromeSync="chromeSync"
        title="Logicommerce background"
        :help="help.lcBackground"
        scope="logicommerce"
        itemKey="background"
        @savedOptions="reciveShowSavedOptions"
      ></logicommerce-background-card>
    </div>
  </div>
</template>

<script>
import help from "@/data/helpOptions";
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
  data() {
    return {
      help,
    };
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
  },
};
</script>