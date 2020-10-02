<template>
  <div
    class="card card-option card-option-beyond-theme"
    v-bind:class="{ active: chromeSync[scope][itemKey].actived }"
  >
    <div class="card-header">
      <div class="card-title">
        {{ title }}
        <b-button variant="link" v-html="iconInfo" @click="openModalClick(itemKey)"></b-button>
      </div>
      <b-form-checkbox
        v-model="chromeSync[scope][itemKey].actived"
        :name="checkboxName"
        switch
        v-on:change="optionChangeActived($event, scope, itemKey)"
      ></b-form-checkbox>
    </div>

    <div class="card-body grid-themes" :title="disabledOptionMessage">
      <div
        class="embed-responsive embed-responsive-theme item"
        v-for="(theme, key) in themes"
        v-bind:key="key"
        :class="themeActive(key)"
        :title="theme.name"
        v-b-tooltip.hover
      >
        <a
          href="#"
          v-on:click.prevent="initSelectTheme(key)"
          class="embed-responsive-item"
          v-bind:style="{ backgroundImage: 'url(' + theme.img + ')' }"
        >
          <div class="rippleJS"></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import optionCard from "@mixins/optionCard";

export default {
  name: "BeyondThemeCard",
  mixins: [optionCard],
  data() {
    return {
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
  methods: {
    initSelectTheme(theme) {
      this.chromeSync.logicommerce.beyondTheme.theme = theme;
      this.selectTheme(theme);
    },
    selectTheme(theme) {
      this.$emit("savedOptions", true);
    },
    themeActive(key) {
      return this.chromeSync.logicommerce.beyondTheme.theme == key
        ? "active"
        : "";
    },
  },
};
</script>