<template>
  <div class="card card-user card-user-info card-user-info-disclaimer">
    <div class="card-header">
      <div class="card-title text-danger">
        <span class="icon" v-html="infoIcon"></span>Disclaimer!
      </div>
    </div>
    <div class="card-body">
      El propòsit d'aquestes dades és per eines de testeig.<br /><br />Tot i que
      no seran mai compartides, no useu una contrasenya d'ús habitual en comptes
      reals.
    </div>
  </div>
</template>

<script>
import { info as infoIcon } from "@/data/icons";

export default {
  name: "CardInfoDisclaimer",
  data() {
    return {
      infoIcon,
    };
  },
};
</script>
