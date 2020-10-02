<template>
  <div class="card card-option" v-bind:class="{ active: chromeSync[scope][itemKey].actived }">
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

    <div class="card-body">
      <div class="d-flex sub-option-line">
        Page groups in grid mode
        <b-form-checkbox
          v-model="chromeSync[scope][itemKey].gridView"
          :name="checkboxNameSubOption('gridView')"
          switch
          v-on:change="changeSubOption($event, scope, itemKey, 'gridView')"
        ></b-form-checkbox>
      </div>
      <div class="d-flex sub-option-line">
        Decorated page group headers 
        <b-form-checkbox
          v-model="chromeSync[scope][itemKey].betterGroupHeaders"
          :name="checkboxNameSubOption('betterGroupHeaders')"
          switch
          v-on:change="changeSubOption($event, scope, itemKey, 'betterGroupHeaders')"
        ></b-form-checkbox>
      </div>
      <div class="d-flex sub-option-line">
        Better tree pages indentation
        <b-form-checkbox
          v-model="chromeSync[scope][itemKey].betterTreeLevels"
          :name="checkboxNameSubOption('betterTreeLevels')"
          switch
          v-on:change="changeSubOption($event, scope, itemKey, 'betterTreeLevels')"
        ></b-form-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import optionCard from "@mixins/optionCard";

export default {
  name: "PagesWindowBetterCard",
  mixins: [optionCard],
  methods: {
    changeSubOption(checked, scope, option, key) {
      this.chromeSync[scope][option][key] = checked;
      this.$emit("savedOptions", true);
    },
    checkboxNameSubOption(key) {
      return `switch-${this.scope}-${this.itemKey}-${key}`;
    },
  },
};
</script>
