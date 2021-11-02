<template>
  <div class="content p-4">
    <div class="title h4 mb-3">{{ data.title }}</div>
    <div class="text mb-5">{{ data.description }}</div>

    <div class="suboptions mb-5" v-if="data.infoBlock">
      <div
        class="form-group"
        v-for="suboption in suboptions"
        :key="suboption.key"
      >
        <b-form-checkbox
          v-model="chromeSync.options[optionKey][suboption.key]"
          :name="checkboxName(suboption.key)"
          switch
          v-on:change="saveSuboption()"
          :id="checkboxId(suboption.key)"
          >{{ suboption.name }}
          <div class="text-muted">{{ suboption.desc }}</div></b-form-checkbox
        >
      </div>
    </div>

    <div class="colors-grid mb-5">
      <div class="color-block" v-for="color in orderColors" v-bind:key="color">
        <label
          :for="checkboxName(color)"
          class="color-button-bg"
          :style="{
            backgroundColor: chromeSync.options[optionKey].colors[color].bg,
            color: chromeSync.options[optionKey].colors[color].text,
          }"
        >
          {{ color }}
          <div class="rippleJS"></div>
        </label>

        <b-form-input
          :id="checkboxName(color)"
          :name="checkboxName(color)"
          type="color"
          v-model="chromeSync.options[optionKey].colors[color].bg"
          v-on:change="debouncedChangeColor($event, color)"
          v-on:update="updateColor($event, color)"
        ></b-form-input>
      </div>
    </div>

    <div class="info mb-5" v-if="data.infoBlock">
      <table class="table text-monospace text-muted">
        <tbody>
          <tr v-for="(value, name) in data.infoBlock" :key="name">
            <td>{{ name }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import optionsData from "@/data/optionsData";
import lightOrDark from "@mixins/utils/lightOrDark";

export default {
  name: "ContentTicketPriorityHighlightColors",
  props: {
    optionKey: String,
    chromeSync: Object,
  },
  mixins: [lightOrDark],
  created() {
    this.$router
      .push({
        params: { option: this.optionKey },
      })
      .catch(() => {});

    this.debouncedChangeColor = _.debounce(this.changeColor, 1000);
  },
  data() {
    return {
      optionsData,
      orderColors: ["low", "normal", "high", "urgent"],
      suboptions: [
        {
          key: "onlyIncidents",
          name: "Only highlight incident tickets",
          desc:
            "Resalta nomes els tickets que siguin de tipus incident (nomes funcionará en llistats de tickets on existeixi la columna que indica si es incident, task, ...)",
        },
      ],
    };
  },
  computed: {
    data() {
      return this.optionsData[this.optionKey];
    },
  },
  methods: {
    checkboxId(key) {
      return `id-switch-${this.optionKey}-${key}`;
    },
    checkboxName(key) {
      return `switch-${this.optionKey}-${key}`;
    },
    saveSuboption() {
      this.$emit("setSavedOptionsCard", true);
    },
    changeColor(value, color) {
      this.chromeSync.options[this.optionKey].colors[color].bg = value;
      this.$emit("setSavedOptionsCard", true);
    },
    updateColor(value, color) {
      this.chromeSync.options[this.optionKey].colors[color].text =
        this.lightOrDark(value) === "light" ? "#222222" : "#ffffff";
    },
  },
};
</script>
