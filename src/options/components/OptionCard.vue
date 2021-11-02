<template>
  <div :class="classList">
    <div class="card-front" :style="{ 'max-width': maxWidth, flex: flex }">
      <a href="#" v-on:click.prevent="clickImage()" class="card-img-top-link">
        <img :src="data.image" class="card-img-top" :alt="data.title" />
        <div class="rippleJS"></div>
      </a>

      <div class="card-body" v-if="!opened">
        <a href="#" v-on:click.prevent="openCard()">
          <div class="card-title">{{ data.title }}</div>
        </a>
        <p class="card-text">{{ data.description }}</p>
      </div>

      <div class="list-group list-group-flush">
        <div class="list-group-item d-flex">
          <b-form-checkbox
            v-model="chromeSync.options[optionKey].actived"
            :name="checkboxName"
            switch
            v-on:change="sendChangeActived()"
            :id="checkboxId"
          ></b-form-checkbox>
          <span class="text-primary">{{ activedText }}</span>
          <label class="rippleJS" :for="checkboxId"></label>
        </div>

        <a href="#" class="list-group-item" v-if="opened"
          ><span class="icon" v-html="infoIcon"></span>Info
          <div class="rippleJS"></div
        ></a>

        <a
          :href="issueLink"
          target="_blank"
          class="list-group-item"
          v-if="opened"
          ><span class="icon" v-html="bugIcon"></span>Report bug
          <div class="rippleJS"></div
        ></a>

        <div class="list-group-item" v-if="opened">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              {{ data.category }}
            </li>
            <li class="breadcrumb-item active">
              {{ data.title }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="card-back" v-if="opened">
        <component
          :is="optionCardContent"
          :optionKey="optionKey"
          :chromeSync="chromeSync"
          @setSavedOptionsCard="sendChangeActived"
        ></component>

        <button class="close close-card" v-on:click.prevent="closeCard()">
          <span class="icon" v-html="timesIcon"></span>
        </button>
      </div>
    </transition>

    <zoom-image-modal
      ref="component-zoom-image-modal"
      :image="data.image"
    ></zoom-image-modal>
  </div>
</template>

<script>
import {
  times as timesIcon,
  info as infoIcon,
  bug as bugIcon,
} from "@/data/icons";
import optionsData from "@/data/optionsData";
import ZoomImageModal from "@options/components/ZoomImageModal";
import ContentDefault from "@options/pages/options/optionContents/ContentDefault";
import ContentBackground from "@options/pages/options/optionContents/ContentBackground";
import ContentPagesWindowBetter from "@options/pages/options/optionContents/ContentPagesWindowBetter";
import ContentTicketPriorityHighlightColors from "@options/pages/options/optionContents/ContentTicketPriorityHighlightColors";
import ContentCoolTicketSubmit from "@options/pages/options/optionContents/ContentCoolTicketSubmit";

export default {
  name: "OptionCard",
  props: {
    optionKey: String,
    chromeSync: Object,
    opened: Boolean,
    maxWidth: String,
    optionCardContent: String,
  },
  components: {
    ZoomImageModal,
    ContentDefault,
    ContentBackground,
    ContentPagesWindowBetter,
    ContentTicketPriorityHighlightColors,
    ContentCoolTicketSubmit,
  },
  data() {
    return {
      optionsData,
      timesIcon,
      infoIcon,
      bugIcon,
    };
  },
  computed: {
    data() {
      return this.optionsData[this.optionKey];
    },
    flex() {
      return `1 0 ${this.maxWidth}`;
    },
    classList() {
      return [
        "card",
        "card-option",
        `option-${this.optionKey}`,
        `actived-${this.chromeSync.options[this.optionKey].actived}`,
      ].join(" ");
    },
    checkboxId() {
      return `id-switch-${this.optionKey}`;
    },
    checkboxName() {
      return `switch-${this.optionKey}`;
    },
    activedText() {
      return this.chromeSync.options[this.optionKey].actived
        ? "Desactivar"
        : "Activar";
    },
    category() {
      const category = this.chromeSync.options[this.optionKey].category;
      return (
        category.charAt(0).toUpperCase() +
        category
          .slice(1)
          .split(/(?=[A-Z])/)
          .join(" ")
          .toLowerCase()
      );
    },
    issueLink() {
      const url = "https://github.com/joelthorner/TLmanaGer/issues/new",
        title = encodeURIComponent(this.data.title + " bug report");

      return `${url}?labels=bug&title=${title}&template=bug_report.md&assignees=joelthorner`;
    },
  },
  methods: {
    openCard() {
      this.$emit("setCardOpenKeyParent", this.optionKey);
    },
    sendChangeActived(checked) {
      this.$emit("setSavedOptionsParent", checked);
    },
    clickImage() {
      if (this.opened) {
        this.$refs["component-zoom-image-modal"].show();
      } else {
        this.$emit("setCardOpenKeyParent", this.optionKey);
      }
    },
    closeCard() {
      this.$router
        .push({
          params: { option: "" },
        })
        .catch(() => {});
      this.$emit("setCardOpenKeyParent", "");
    },
  },
};
</script>
