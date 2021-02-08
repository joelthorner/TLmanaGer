<template>
  <div class="page-content">
    <div id="options-content">
      <main-title title="OPTIONS"></main-title>

      <options-nav
        :categories="categories"
        @setFilterParent="setFilter"
      ></options-nav>

      <main-content containerClass="options-container">
        <transition-group class="grid-options dynamic-grid" name="dynamic-grid">
          <div
            class="dynamic-grid-item"
            v-for="(option, optionKey) in activeOptions"
            v-bind:key="option.priority"
          >
            <option-card :option="option" :optionKey="optionKey"></option-card>
          </div>
        </transition-group>
      </main-content>

      <!--- <b-toast
        title="Saved options"
        no-auto-hide
        toaster="b-toaster-bottom-center"
        :visible="showSavedOptions"
        no-close-button
      ></b-toast> -->
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
      openedKey: "",
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
        Object.entries(this.orderedOptions).filter(
          ([key, value]) =>
            value.category === this.currentFilter ||
            this.currentFilter === ALL_CATEGORIES
        )
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
            text: category.charAt(0).toUpperCase() + category.slice(1),
            value: category,
          });
        }
      }

      return result;
    },
  },
  methods: {
    setFilter(value) {
      this.currentFilter = value;
    },
  },
};
</script>