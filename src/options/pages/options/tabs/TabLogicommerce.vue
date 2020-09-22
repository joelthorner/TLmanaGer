<template>
  <div class="tab">
    <div class="inner-text">Opcions de personalització de logicommerce, fons, themes, millores...</div>

    <div class="row">
      <div class="col col-xs-12 col-lc-layout-left">
        <div class="fake-row">
          <div class="fake-col">
            <default-card
              :chromeSync="chromeSync"
              title="Developer bar"
              :help="help.developerBar"
              scope="logicommerce"
              itemKey="developerBar"
              @savedOptions="reciveShowSavedOptions"
            ></default-card>
          </div>
          <div class="fake-col">
            <default-card
              :chromeSync="chromeSync"
              title="Sandbox login buttons"
              :help="help.sandboxLoginButtons"
              scope="logicommerce"
              itemKey="sandboxLoginButtons"
              @savedOptions="reciveShowSavedOptions"
            ></default-card>
          </div>
          <div class="fake-col">
            <default-card
              :chromeSync="chromeSync"
              title="Pages grid view"
              :help="help.pagesGridView"
              scope="logicommerce"
              itemKey="pagesGridView"
              @savedOptions="reciveShowSavedOptions"
            ></default-card>
          </div>
          <div class="fake-col">
            <beyond-theme-card
              :chromeSync="chromeSync"
              title="Beyond theme"
              :help="help.beyondTheme"
              scope="logicommerce"
              itemKey="beyondTheme"
              @savedOptions="reciveShowSavedOptions"
            ></beyond-theme-card>
          </div>
        </div>
      </div>

      <div class="col col-xs-12 col-lc-layout-right">
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
  </div>
</template>

<script>
import help from "@/data/helpOptions";
import DefaultCard from "@options/pages/options/cards/DefaultCard";
import BeyondThemeCard from "@options/pages/options/cards/BeyondThemeCard";
import LogicommerceBackgroundCard from "@options/pages/options/cards/LogicommerceBackgroundCard";

export default {
  name: "TabLogicommerce",
  components: {
    DefaultCard,
    BeyondThemeCard,
    LogicommerceBackgroundCard,
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