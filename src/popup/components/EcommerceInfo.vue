<template>
  <div class="ecommerce-info" v-if="existsEcommerceData">
    <div class="title">Ecommerce Info</div>
    <div class="info d-flex">
      <div class="item item-type" v-if="ecommerceData.type" title="Type">
        <span :class="iconClass('type')"></span>{{ ecommerceData.type }}
      </div>
      <div
        class="item item-environment"
        v-if="ecommerceData.environment"
        title="Environment"
      >
        <span :class="iconClass('environment')"></span
        >{{ ecommerceData.environment }}
      </div>
      <div class="item item-cache" v-if="ecommerceData.cache" title="Cache">
        <span :class="iconClass('cache')"></span>{{ ecommerceData.cache }}
      </div>
    </div>

    <!-- {{ ecommerceData }} -->

    <!-- { "type": null, "environment": null, "fluidData": { "template": null },
    "shopId": null, "cache": false } -->
  </div>
</template>

<script>
// import { settings as settingsIcon } from "@/data/icons";

export default {
  name: "EcommerceInfo",
  props: {
    ecommerceData: {
      required: true,
      validator: (prop) => typeof prop === "object" || prop === null,
    },
  },
  data() {
    return {};
  },
  computed: {
    existsEcommerceData() {
      return this.ecommerceData &&
        (this.ecommerceData.type ||
          this.ecommerceData.environment ||
          this.ecommerceData.cache)
        ? true
        : false;
    },
  },
  methods: {
    iconClass(value) {
      return `icon icon-${this.ecommerceData[value]}`;
    },
  },
};
</script>
