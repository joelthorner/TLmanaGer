<template>
  <div :class="classList">
    <button class="close close-card" v-on:click.prevent="closeCard()">
      <span class="icon" v-html="timesIcon"></span>
    </button>

    <div class="column-left">
      <a href="#" v-on:click.prevent="clickImage()">
        <img
          :src="optionsData[optionKey].image"
          class="card-img-top"
          :alt="optionsData[optionKey].title"
        />
      </a>

      <div class="card-body">
        <a href="#" v-on:click.prevent="openCard()">
          <div class="card-title">{{ optionKey }}</div>
        </a>

        <p class="card-text">{{ optionsData[optionKey].description }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <b-form-checkbox
            v-model="chromeSync.options[optionKey].actived"
            :name="checkboxName"
            switch
            v-on:change="sendChangeActived()"
            >Activar / Desactivar</b-form-checkbox
          >
        </li>
        <li class="list-group-item ocult">
          <a href="#"><span class="icon" v-html="infoIcon"></span>Info</a>
        </li>
        <li class="list-group-item ocult">
          <a href="#"><span class="icon" v-html="bugIcon"></span>Report bug</a>
        </li>
      </ul>
    </div>
    <div class="column-right pl-5 p-4">
      <div class="card-title">Activar / Desactivar</div>
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
    checkboxName() {
      return `switch-${this.optionKey}`;
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