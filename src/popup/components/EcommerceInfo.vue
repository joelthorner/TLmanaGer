<template>
  <div class="ecommerce-info" v-if="existsEcommerceData">
    <div class="title">
      Ecommerce info
    </div>
    <div class="info d-flex flex-wrap">
      <div
        class="item item-shopId"
        v-if="ecommerceData.shopId"
        title="Shop id"
        v-b-tooltip.hover
      >
        <span :class="iconClass('shopId')"></span>{{ ecommerceData.shopId }}
      </div>
      <div
        class="item item-type"
        v-if="ecommerceData.type"
        title="Type"
        v-b-tooltip.hover
      >
        <span :class="iconClass('type')"></span>{{ ecommerceData.type }}
      </div>
      <div
        class="item item-environment"
        v-if="ecommerceData.environment"
        title="Environment"
        v-b-tooltip.hover
      >
        <span :class="iconClass('environment')"></span
        >{{ ecommerceData.environment }}
      </div>
      <div
        class="item item-cache"
        v-if="ecommerceData.cache"
        title="Cache"
        v-b-tooltip.hover
      >
        <span :class="iconClass('cache')"></span>Has cache
      </div>
      <div
        class="item item-template"
        v-if="ecommerceData.template"
        title="Template"
        v-b-tooltip.hover
      >
        <span :class="iconClass('template')"></span>
        {{ ecommerceData.template }}
      </div>
    </div>
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
        this.ecommerceData.shopId &&
        (this.ecommerceData.type ||
          this.ecommerceData.environment ||
          this.ecommerceData.cache)
        ? true
        : false;
    },
  },
  methods: {
    iconClass(key) {
      let value = this.ecommerceData[key];
      return `icon icon-${key} icon-${value}`;
    },
  },
};
</script>
