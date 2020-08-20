<template>
  <div class="card card-option">
    <div class="card-header">
      <div class="card-title">
        {{ title }}
        <b-button
          v-b-popover.hover.rightbottom="popover.content"
          :title="popover.title"
          variant="link"
          v-html="iconInfo"
        ></b-button>
      </div>
      <b-form-checkbox
        v-model="chromeSync[scope][itemKey].actived"
        :name="checkboxName"
        switch
        v-on:change="debouncedOptionChangeActived($event, scope, itemKey)"
      ></b-form-checkbox>
    </div>
    <div class="card-body">
      <div class="item" v-for="(theme, key) in themes" v-bind:key="key" :class="themeActive(key)">
        <a href="#" :title="theme.name" v-on:click.prevent="debouncedSelectTheme(key)">
          <img :src="theme.img" :alt="theme.name" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import icons from "@/data/icons";

export default {
  name: "BeyondThemeCard",
  data() {
    return {
      iconInfo: icons.info,
      themes: {
        default: {
          name: "Default",
          img: chrome.extension.getURL("img/beyond-themes/default.png"),
        },
        cyberPonk: {
          name: "Cyber ponk",
          img: chrome.extension.getURL("img/beyond-themes/cyber-ponk.png"),
        },
      },
    };
  },
  props: {
    chromeSync: Object,
    title: String,
    popover: Object,
    scope: String,
    itemKey: String,
  },
  computed: {
    checkboxName() {
      return `switch-${this.scope}-${this.itemKey}`;
    },
  },
  created: function () {
    this.debouncedOptionChangeActived = _.debounce(
      this.optionChangeActived,
      1000
		);
		this.debouncedSelectTheme = _.debounce(
      this.selectTheme,
      1000
    );
  },
  methods: {
		selectTheme(theme) {
			this.chromeSync.logicommerce.beyondTheme.theme = theme;
			this.$emit('savedOptions', true);
		},
    themeActive(key) {
      return this.chromeSync.logicommerce.beyondTheme.theme == key
        ? "active"
        : "";
    },
   optionChangeActived(checked, scope, option) {
      this.chromeSync[scope][option].active = checked;
			this.$emit('savedOptions', true);
    },
  },
};
</script>