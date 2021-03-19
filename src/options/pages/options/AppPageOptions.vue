<template>
  <div class="page-content">
    <div id="options-content">
      <main-title title="Options"></main-title>

      <options-nav
        :categories="categories"
        @setFilterParent="setFilter"
      ></options-nav>

      <main-content containerClass="options-container">
        <div class="p-relative">
          <div
            class="dynamic-grid-item dynamic-grid-item-ref"
            ref="cardRefWidth"
          ></div>
        </div>

        <transition-group
          :class="{
            'grid-options': true,
            'dynamic-grid': true,
            'opened-card': isCardOpened(cardOpenKey),
          }"
          name="dynamic-grid"
        >
          <div
            :class="{
              'dynamic-grid-item': true,
              'dynamic-grid-options-item': true,
              hidden: isCardHidden(option.key),
              opened: isCardOpened(option.key),
            }"
            v-for="option in getOptions"
            :key="option.priority"
          >
            <option-card
              :optionKey="option.key"
              :chromeSync="chromeSync"
              :maxWidth="cardMaxWidth"
              :opened="cardOpenKey == option.key"
              :optionCardContent="optionCardContent(option.key)"
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
  </div>
</template>

<script>
import _ from "lodash";
import watchAchievements from "@mixins/watchAchievements";
import optionsData from "@/data/optionsData";
import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import OptionsNav from "@options/pages/options/OptionsNav";
import OptionCard from "@options/components/OptionCard";

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
  },
  created: function () {
    this.debounceSetCardMaxWidth = _.debounce(this.setCardMaxWidth, 250);
    window.addEventListener("resize", this.debounceSetCardMaxWidth);

    if (this.$route.params.option) {
      this.cardOpenKey = this.$route.params.option;
    }
  },
  mounted() {
    this.setCardMaxWidth();
  },
  mixins: [watchAchievements],
  data() {
    return {
      currentFilter: ALL_CATEGORIES,
      cardOpenKey: "",
      showSavedOptions: false,
      cardMaxWidth: "100%",
      optionsData,
    };
  },
  computed: {
    getOptions() {
      const cloneOptions = { ...this.chromeSync.options };

      // Merge chromeSync with options extra data
      for (const property in cloneOptions) {
        cloneOptions[property] = {
          ...cloneOptions[property],
          ...this.optionsData[property],
          ...{ key: property },
        };
      }

      // Transform to array and order
      let result = _.sortBy(cloneOptions, [
        (object) => {
          return object.priority;
        },
      ]);

      // Filter by category or a unique card if someone is actived
      return result.filter((option) => {
        return (
          this.cardKeyMatch(option.key) ||
          this.cardCategoryMatch(option.category, option.show)
        );
      });
    },
    categories() {
      let result = [],
        keys = [];

      for (const property in this.optionsData) {
        const category = this.optionsData[property].category;

        if (!keys.includes(category)) {
          keys.push(category);

          result.push({
            text: this.getCategoryText(category),
            value: category,
          });
        }
      }

      return result;
    },
  },
  methods: {
    getCategoryText(name) {
      return `${name.charAt(0).toUpperCase()}${name
        .slice(1)
        .split(/(?=[A-Z])/)
        .join(" ")
        .toLowerCase()}`;
    },
    /**
     * Returns true if param key is same as opened card key
     * @param {string} key
     * @returns {boolean}
     */
    cardKeyMatch(key) {
      return this.cardOpenKey.length && this.cardOpenKey === key;
    },
    /**
     * Returns true if hasn opened card and category is all value or
     * selected category is same as option
     * @param {string} category
     * @param {boolean} show
     * @returns {boolean}
     */
    cardCategoryMatch(category, show) {
      const categoryMatch = category === this.currentFilter,
        allCategoriesMatch = this.currentFilter === ALL_CATEGORIES;

      return (
        !this.cardOpenKey.length &&
        (categoryMatch || allCategoriesMatch) &&
        show === true
      );
    },
    /**
     * Get content type option vue component
     * @param {string} key
     * @returns {string}
     */
    optionCardContent(key) {
      if (key === "background") {
        return "ContentBackground";
      } else if (key === "pagesWindowBetter") {
        return "ContentPagesWindowBetter";
      }
      return "ContentDefault";
    },
    setCardMaxWidth() {
      this.cardMaxWidth = "100%;";

      let style = window.getComputedStyle(this.$refs.cardRefWidth, null);

      this.cardMaxWidth =
        parseFloat(style.getPropertyValue("width")) -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight) +
        "px";
    },
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
    setSavedOptions() {
      chrome.storage.sync.set(this.chromeSync, () => {
        this.showSavedOptions = true;
        // Achievements
        this.activeAllOptions();
        this.activeAllZenOpts();

        setTimeout(() => {
          this.showSavedOptions = false;
        }, 2000);
      });
    },
  },
};
</script>