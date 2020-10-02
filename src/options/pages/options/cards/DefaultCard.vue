<template>
  <div
    class="card card-option"
    v-bind:class="{ active: chromeSync[scope][itemKey].actived }"
  >
    <div class="card-header">
      <div class="card-title">
        {{ title }}
        <b-button
          variant="link"
          v-html="iconInfo"
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
  </div>
</template>

<script>
import optionCard from "@mixins/optionCard";

export default {
  name: "DefaultCard",
  mixins: [optionCard],
};
</script>