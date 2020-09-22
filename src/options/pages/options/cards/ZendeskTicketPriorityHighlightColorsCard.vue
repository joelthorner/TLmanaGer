<template>
  <div
    class="card card-option card-zen-tkt-colors"
    v-bind:class="{ active: chromeSync[scope][itemKey].actived }"
  >
    <div class="card-header">
      <div class="card-title">
        {{ title }}
        <b-button v-b-modal="thisModalId" variant="link" v-html="iconInfo"></b-button>
      </div>
      <b-form-checkbox
        v-model="chromeSync[scope][itemKey].actived"
        :name="checkboxName"
        switch
        v-on:change="debouncedOptionChangeActived($event, scope, itemKey)"
      ></b-form-checkbox>
    </div>

    <div class="card-body">
      <div class="d-flex only-tickets">
        Only highlight incident tickets
        <b-form-checkbox
          v-model="chromeSync[scope][itemKey].onlyIncidents"
          :name="checkboxNameOnlyIncidents"
          switch
          v-on:change="debouncedChangeOnlyIncidents($event, scope, itemKey)"
        ></b-form-checkbox>
      </div>

      <div class="colors-grid">
        <div class="color-block" v-for="color in orderColors" v-bind:key="color">
          <label
            :for="inputColorName(color)"
            class="color-button-bg"
            :style="{ backgroundColor: chromeSync[scope][itemKey].colors[color].bg, color: chromeSync[scope][itemKey].colors[color].text }"
          >
            {{color}}
            <div class="rippleJS"></div>
          </label>

          <b-form-input
            :id="inputColorName(color)"
            :name="inputColorName(color)"
            type="color"
            v-model="chromeSync[scope][itemKey].colors[color].bg"
            v-on:change="debouncedChangeColor($event, scope, itemKey, color)"
            v-on:update="updateColor($event, scope, itemKey, color)"
          ></b-form-input>
        </div>
      </div>
    </div>

    <help-modal :thisModalId="thisModalId" :data="help"></help-modal>
  </div>
</template>

<script>
import optionCard from "@options/mixins/optionCard";
import lightOrDark from "@options/mixins/utils/lightOrDark";

export default {
  name: "ZendeskTicketPriorityHighlightColorsCard",
  mixins: [optionCard, lightOrDark],
  data() {
    return {
      orderColors: ["low", "normal", "high", "urgent"],
    };
  },
  computed: {
    checkboxNameOnlyIncidents() {
      return `switch-${this.scope}-${this.itemKey}-onlyIncidents`;
    },
  },
  created: function () {
    this.debouncedChangeOnlyIncidents = _.debounce(
      this.changeOnlyIncidents,
      1000
    );
    this.debouncedChangeColor = _.debounce(this.changeColor, 1000);
  },
  methods: {
    inputColorName(key) {
      return `color-${this.scope}-${this.itemKey}-${key}`;
    },
    changeOnlyIncidents(checked, scope, option) {
      this.chromeSync[scope][option].onlyIncidents = checked;
      this.$emit("savedOptions", true);
    },
    changeColor(value, scope, option, color) {
      this.chromeSync[scope][option].colors[color].bg = value;
      // this.chromeSync[scope][option].colors[color].text =
      //   this.lightOrDark(value) === "light" ? "#222222" : "#ffffff";
      this.$emit("savedOptions", true);
    },
    updateColor(value, scope, option, color) {
      this.chromeSync[scope][option].colors[color].text =
        this.lightOrDark(value) === "light" ? "#222222" : "#ffffff";
    },
  },
};
</script>