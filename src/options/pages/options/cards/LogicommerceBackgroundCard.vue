<template>
  <div class="card card-option card-option-lc-bg" v-bind:class="{ active: chromeSync[scope][itemKey].actived }">
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
			hola
		</div>

    <help-modal :thisModalId="thisModalId" :data="help"></help-modal>
  </div>
</template>

<script>
import _ from "lodash";
import optionCard from "@options/mixins/optionCard";

export default {
	name: "LCBackgroundCard",
	mixins: [optionCard],
};
</script>