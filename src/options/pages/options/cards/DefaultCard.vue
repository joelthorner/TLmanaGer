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
        v-model="chromeData[scope][itemKey].actived"
        :name="checkboxName"
        switch
        v-on:change="debouncedOptionChangeActived($event, scope, itemKey)"
      ></b-form-checkbox>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import icons from "@/icons";

export default {
  name: "DefaultCard",
  data() {
    return {
      iconInfo: icons.info,
    };
  },
  props: {
    chromeData: Object,
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
  },
  methods: {
    optionChangeActived(checked, scope, option) {
      this.chromeData[scope][option].active = checked;
      this.saveChromeData();
    },
    saveChromeData() {
      chrome.storage.sync.set(this.chromeData, () => {
        this.$parent.showSavedOptions = true;
        setTimeout(() => {
          this.$parent.showSavedOptions = false;
        }, 2000);
      });
    },
  },
};
</script>