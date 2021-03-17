<template>
  <div class="content p-4">
    <div class="title h4 mb-3">{{ data.title }}</div>
    <div class="text mb-5">{{ data.description }}</div>
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
  name: "ContentDefault",
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
    };
  },
  computed: {
    data() {
      return this.optionsData[this.optionKey];
    },
  },
};
</script>