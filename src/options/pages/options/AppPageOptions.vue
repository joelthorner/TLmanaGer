<template>
  <div class="page-content">
    <div id="options-content">
      <main-title title="OPTIONS"></main-title>

      <options-nav
        :categories="categories"
        @setFilterParent="setFilter"
      ></options-nav>

      <main-content containerClass="options-container">
        <transition-group
          v-bind:class="{
            'grid-options': true,
            'dynamic-grid': true,
            'opened-card': isCardOpened(cardOpenKey),
          }"
          name="dynamic-grid"
        >
          <div
            v-bind:class="{
              'dynamic-grid-item': true,
              hidden: isCardHidden(optionKey),
              opened: isCardOpened(optionKey),
            }"
            v-for="(option, optionKey) in activeOptions"
            v-bind:key="option.priority"
          >
            <option-card
              :option="option"
              :optionKey="optionKey"
              :chromeSync="chromeSync"
              :opened="cardOpenKey == optionKey"
              @setCardOpenKeyParent="setCardOpenKey"
              @setSavedOptionsParent="setSavedOptions"
            ></option-card>
          </div>
        </transition-group>
      </main-content>

      <b-toast
        title="Saved options"
        no-auto-hide
        toaster="b-toaster-bottom-center"
        :visible="showSavedOptions"
        no-close-button
      ></b-toast>
    </div>

    <!-- <help-modal :dataKey="clickedHelpDataKey"></help-modal> -->
  </div>
</template>

<script>
import watchArchievements from "@mixins/watchArchievements";

import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import OptionsNav from "@options/pages/options/OptionsNav";
import OptionCard from "@options/components/OptionCard";
// import HelpModal from "@options/components/HelpModal";

const ALL_CATEGORIES = "all";

export default {
  name: "AppPageOptions",
  props: {
    chromeSync: Object,
  },
  components: {
    MainTitle,
    MainContent,
    OptionsNav,
    OptionCard,
    // HelpModal,
  },
  mixins: [watchArchievements],
  data() {
    return {
      currentFilter: ALL_CATEGORIES,
      cardOpenKey: "",
      showSavedOptions: false,
    };
  },
  computed: {
    orderedOptions() {
      return Object.fromEntries(
        Object.entries(this.chromeSync.options).sort(
          ([, a], [, b]) => a.priority - b.priority
        )
      );
    },
    activeOptions() {
      return Object.fromEntries(
        Object.entries(this.orderedOptions).filter(([key, value]) => {
          if (this.cardOpenKey.length && this.cardOpenKey === key) {
            return true;
          }
          if (
            !this.cardOpenKey.length &&
            (value.category === this.currentFilter ||
              this.currentFilter === ALL_CATEGORIES)
          ) {
            return true;
          }
          return false;
        })
      );
    },
    categories() {
      let result = [],
        keys = [];

      for (const property in this.orderedOptions) {
        const category = this.orderedOptions[property].category;

        if (!keys.includes(category)) {
          keys.push(category);

          result.push({
            text:
              category.charAt(0).toUpperCase() +
              category
                .slice(1)
                .split(/(?=[A-Z])/)
                .join(" ")
                .toLowerCase(),
            value: category,
          });
        }
      }

      return result;
    },
  },
  methods: {
    isCardHidden(optionKey) {
      return this.cardOpenKey.length && this.cardOpenKey != optionKey;
    },
    isCardOpened(optionKey) {
      return this.cardOpenKey.length && this.cardOpenKey == optionKey;
    },
    setFilter(value) {
      this.currentFilter = value;
    },
    setCardOpenKey(value) {
      this.cardOpenKey = value;
    },
    setSavedOptions(value) {
      chrome.storage.sync.set(this.chromeSync, () => {
        this.showSavedOptions = true;
        this.activeAllOpts(); // archivement
        this.activeAllZenOpts(); // archivement
        setTimeout(() => {
          this.showSavedOptions = false;
        }, 2000);
      });
    },
  },
};
</script>