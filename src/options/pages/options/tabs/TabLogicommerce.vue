<template>
  <div class="tab">
    <div class="inner-text">Opcions de personalització de logicommerce, fons, themes, millores...</div>

    <div class="row">
      <div class="col col-xs-12 col-lg-4">
        <div class="card card-option">
          <div class="card-header">
            <div class="card-title">
              Developer bar
              <b-button
                v-b-popover.hover.rightbottom="'Lorem ipsum'"
                title="Popover Title"
                variant="link"
                v-html="iconInfo"
              ></b-button>
            </div>
            <b-form-checkbox
              v-model="chromeData.logicommerce.developerBar.actived"
              name="switch-logicommerce-developerBar"
              switch
              v-on:change="debouncedOptionChangeActived($event,'logicommerce', 'developerBar')"
            ></b-form-checkbox>
          </div>
        </div>

        <div class="card card-option">
          <div class="card-header">
            <div class="card-title">
              Sandbox login buttons
              <b-button
                v-b-popover.hover.rightbottom="'Lorem ipsum'"
                title="Popover Title"
                variant="link"
                v-html="iconInfo"
              ></b-button>
            </div>
            <b-form-checkbox
              v-model="chromeData.logicommerce.sandboxLoginButtons.actived"
              name="switch-logicommerce-sandboxLoginButtons"
              switch
              v-on:change="debouncedOptionChangeActived($event,'logicommerce', 'sandboxLoginButtons')"
            ></b-form-checkbox>
          </div>
        </div>

				<div class="card card-option">
          <div class="card-header">
            <div class="card-title">
              Pages grid view
              <b-button
                v-b-popover.hover.rightbottom="'Lorem ipsum'"
                title="Popover Title"
                variant="link"
                v-html="iconInfo"
              ></b-button>
            </div>
            <b-form-checkbox
              v-model="chromeData.logicommerce.pagesGridView.actived"
              name="switch-logicommerce-pagesGridView"
              switch
              v-on:change="debouncedOptionChangeActived($event,'logicommerce', 'pagesGridView')"
            ></b-form-checkbox>
          </div>
        </div>
      </div>

      <div class="col col-xs-12 col-lg-8">
        <div class="card card-option card-option-bg">
          <div class="card-header">
            <div class="card-title">
              LC Background
              <b-button
                v-b-popover.hover.rightbottom="'Lorem ipsum'"
                title="Popover Title"
                variant="link"
                v-html="iconInfo"
              ></b-button>
            </div>
            <b-form-checkbox
              v-model="chromeData.logicommerce.background.actived"
              name="switch-logicommerce-background"
              switch
              v-on:change="debouncedOptionChangeActived($event,'logicommerce', 'background')"
            ></b-form-checkbox>
          </div>
          <div class="card-body">body</div>
        </div>
      </div>
    </div>

    <b-toast
      id="saved-toast"
      title="Saved options"
      no-auto-hide
      toaster="b-toaster-bottom-center"
      :visible="showSavedOptions"
      no-close-button
    ></b-toast>
  </div>
</template>

<script>
import _ from "lodash";
import icons from "./../../../../icons.js";

export default {
  name: "TabLogicommerce",
  props: {
    chromeData: Object,
  },
  data() {
    return {
      iconInfo: icons.info,
      showSavedOptions: false,
    };
  },
  created: function () {
    this.debouncedOptionChangeActived = _.debounce(
      this.optionChangeActived,
      500
    );
  },
  methods: {
    optionChangeActived(checked, scope, option) {
      this.chromeData[scope][option].active = checked;
      this.saveChromeData();
    },
    saveChromeData() {
      chrome.storage.sync.set(this.chromeData, () => {
        this.showSavedOptions = true;
        setTimeout(() => {
          this.showSavedOptions = false;
        }, 2000);
      });
    },
  },
};
</script>