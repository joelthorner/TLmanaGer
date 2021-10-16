<template>
  <div class="tab">
    <div class="reset-block">
      <div class="inner">
        <svg
          id="icon-toilet"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <defs />
          <g fill="#4c4c4f">
            <circle cx="256" cy="123.733" r="42.667" />
            <path
              d="M76.8 337.067H42.667C19.106 337.067 0 317.961 0 294.4V157.867C0 134.306 19.106 115.2 42.667 115.2h179.2c4.71 0 8.533 3.823 8.533 8.533 0 4.71-3.823 8.533-8.533 8.533h-179.2c-14.14 0-25.6 11.46-25.6 25.6V294.4c0 14.14 11.46 25.6 25.6 25.6H76.8c4.71 0 8.533 3.823 8.533 8.533s-3.823 8.534-8.533 8.534z"
            />
          </g>
          <path
            d="M426.667 294.4v136.533H85.333c-18.859 0-34.133-30.549-34.133-68.267S66.475 294.4 85.333 294.4h341.334z"
            fill="#bfa380"
          />
          <g fill="#6b5b4b">
            <path
              d="M170.667 362.667c0 34.133 9.045 58.795 18.091 68.267h-20.821c-9.975-21.35-14.882-44.715-14.336-68.267-.546-23.552 4.361-46.916 14.336-68.267h20.821c-9.046 9.472-18.091 34.133-18.091 68.267zM290.133 362.667c0 34.133 9.045 58.795 18.091 68.267h-20.821c-9.975-21.35-14.882-44.715-14.336-68.267-.546-23.552 4.361-46.916 14.336-68.267h20.821c-9.045 9.472-18.091 34.133-18.091 68.267z"
            />
            <ellipse cx="426.667" cy="362.667" rx="34.133" ry="68.267" />
          </g>
          <path
            d="M469.333 337.067H435.2c-4.71 0-8.533-3.823-8.533-8.533S430.49 320 435.2 320h34.133c14.14 0 25.6-11.46 25.6-25.6 0-4.71 3.823-8.533 8.533-8.533 4.71 0 8.533 3.823 8.533 8.533.001 23.561-19.105 42.667-42.666 42.667z"
            fill="#4c4c4f"
          />
        </svg>

        <div class="title h4">Reset all options to default values</div>
        <div class="text-muted">
          All stored user data and options will be deleted.
        </div>

        <b-button v-b-modal.modal-restore variant="danger">Reset</b-button>

        <b-modal
          id="modal-restore"
          title="Reset all options to default values."
          hide-footer
          hide-header
          centered
          size="sm"
        >
          <span class="emoji">🦄</span>
          <span class="text-muted">Are you sure?</span>
          <div class="buttons">
            <b-button
              variant="outline-primary"
              @click="$bvModal.hide('modal-restore')"
              >No</b-button
            >
            <b-button variant="primary" @click="realReset">Yes</b-button>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import watchAchievements from "@mixins/watchAchievements";
import defaultData from "@/data/chromeSync";

export default {
  name: "TabReset",
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      defaultData,
    };
  },
  mixins: [watchAchievements],
  methods: {
    realReset() {
      this.chromeSync.options = defaultData.options;
      this.chromeSync.profile = defaultData.profile;

      chrome.storage.sync.set(this.chromeSync, () => {
        this.resetSyncData(); // achievement
        setTimeout(() => {
          this.$bvModal.hide("modal-restore");
        }, 500);
      });
    },
  },
};
</script>
