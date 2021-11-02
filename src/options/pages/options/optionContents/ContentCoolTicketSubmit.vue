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
import optionsData from "@/data/optionsData";

export default {
  name: "ContentCoolTicketSubmit",
  props: {
    optionKey: String,
    chromeSync: Object,
  },
  created() {
    this.$router
      .push({
        params: { option: this.optionKey },
      })
      .catch(() => {});
  },
  data() {
    return {
      optionsData,
      suboptions: [
        {
          key: "replyTicketConfirmPopup",
          name: "Reply ticket confirm dialog",
          desc: "Al fer submit de un missatge demana una confirmació previa.",
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
  },
};
</script>
