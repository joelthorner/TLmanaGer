<template>
  <div class="card card-option">
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

    <b-modal :id="thisModalId" centered :title="popover.title">
      <span v-html="popover.content"></span>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import icons from "@/data/icons";

export default {
  name: "DefaultCard",
  data() {
    return {
      iconInfo: icons.info,
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
    thisModalId() {
      return `help-modal-${this.itemKey}`;
    },
    checkboxName() {
      return `switch-${this.scope}-${this.itemKey}`;
    },
  },
  created: function () {
    this.debouncedOptionChangeActived = _.debounce(
      this.optionChangeActived,
      1000
    );
  },
  methods: {
    optionChangeActived(checked, scope, option) {
      this.chromeSync[scope][option].active = checked;
      this.$emit("savedOptions", true);
    },
  },
};
</script>