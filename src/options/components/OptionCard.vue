<template>
  <div :class="classList">
    <button class="close close-card" v-on:click.prevent="closeCard()">
      <span class="icon" v-html="timesIcon"></span>
    </button>

    <div class="column-left">
      <a href="#" v-on:click.prevent="clickImage()" class="card-img-top-link">
        <img
          :src="optionsData[optionKey].image"
          class="card-img-top"
          :alt="optionsData[optionKey].title"
        />
        <div class="rippleJS"></div>
      </a>

      <div class="card-body">
        <a href="#" v-on:click.prevent="openCard()">
          <div class="card-title">{{ optionsData[optionKey].title }}</div>
        </a>

        <p class="card-text">{{ optionsData[optionKey].description }}</p>
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

        <a href="#" class="list-group-item ocult"
          ><span class="icon" v-html="infoIcon"></span>Info
          <div class="rippleJS"></div
        ></a>

        <a href="#" class="list-group-item ocult"
          ><span class="icon" v-html="bugIcon"></span>Report bug
          <div class="rippleJS"></div
        ></a>

        <div class="list-group-item ocult">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              {{ category }}
            </li>
            <li class="breadcrumb-item active">
              {{ optionsData[optionKey].title }}
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="column-right pl-5 p-4">
      <div class="card-title">asdasdasd</div>
      <div class="card-body"></div>
    </div>
  </div>
</template>

<script>
// import VanillaTilt from "vanilla-tilt";
import {
  times as timesIcon,
  info as infoIcon,
  bug as bugIcon,
} from "@/data/icons";
import optionsData from "@/data/optionsData";

export default {
  name: "OptionCard",
  props: {
    option: Object,
    optionKey: String,
    chromeSync: Object,
    opened: Boolean,
  },
  data() {
    return {
      optionsData,
      timesIcon,
      infoIcon,
      bugIcon,
    };
  },
  mounted() {
    // VanillaTilt.init(this.$el);
  },
  computed: {
    classList() {
      return ["card", "card-option", "option-" + this.optionKey].join(" ");
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
      } else {
        this.$emit("setCardOpenKeyParent", this.optionKey);
      }
    },
    closeCard() {
      this.$emit("setCardOpenKeyParent", "");
    },
  },
};
</script>