<template>
  <div
    class="card card-option card-colors-selectpicker"
    v-bind:class="{ active: chromeSync[scope][itemKey].actived }"
  >
    <div class="card-header">
      <div class="card-title">
        {{ title }}
        <b-button
          variant="link"
          v-html="infoIcon"
          @click="openModalClick(itemKey)"
        ></b-button>
      </div>
      <b-form-checkbox
        v-model="chromeSync[scope][itemKey].actived"
        :name="checkboxName"
        switch
        v-on:change="optionChangeActived($event, scope, itemKey)"
      ></b-form-checkbox>
    </div>

    <div class="card-body">
      <div class="colors-grid">
        <div
          class="color-block"
          v-for="color in orderColors"
          v-bind:key="color"
        >
          <label
            :for="inputColorName(color)"
            class="color-button-bg"
            :style="{
              backgroundColor: chromeSync[scope][itemKey].colors[color],
              color: '#FFF',
            }"
          >
            {{ color }}
            <div class="rippleJS"></div>
          </label>

          <b-form-input
            :id="inputColorName(color)"
            :name="inputColorName(color)"
            type="color"
            v-model="chromeSync[scope][itemKey].colors[color]"
            v-on:change="debouncedChangeColor($event, scope, itemKey, color)"
          ></b-form-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import optionCard from "@mixins/optionCard";

export default {
  name: "LogicommerceThemeColorsCard",
  mixins: [optionCard],
  data() {
    return {
      orderColors: ["main", "secondary"],
    };
  },
  created: function () {
    this.debouncedChangeColor = _.debounce(this.changeColor, 1000);
  },
  methods: {
    inputColorName(key) {
      return `color-${this.scope}-${this.itemKey}-${key}`;
    },
    changeColor(value, scope, option, color) {
      this.chromeSync[scope][option].colors[color] = value;
      this.$emit("savedOptions", true);
    },
  },
};
</script>