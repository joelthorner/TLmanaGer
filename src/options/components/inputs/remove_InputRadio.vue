<template>
  <div :class="containerClass" style="display: contents">
    <div :class="itemClass" v-for="(val, key) in options" :key="val">
      <label>
        <input
          type="radio"
          :name="name"
          :value="val"
          :checked="val == value"
          @change="$emit('input', val)"
        />
        {{ key }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputRadio",
  props: {
    containerClass: String,
    itemClass: {
      type: String,
      default: "form-group",
    },
    name: String,
    value: {
      required: true,
    },
    options: Object,
  },
};
</script>
