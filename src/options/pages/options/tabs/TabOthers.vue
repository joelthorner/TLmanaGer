<template>
  <div class="tab">
    <div class="inner-text">Other options</div>

    <div class="row">
      <div class="col-xs-12 col-lg-6 col-xl-4">
        <default-card
          :chromeSync="chromeSync"
          title="Steal font awesome icon code"
          :help="help.stealFontWesomeIcons"
          scope="others"
          itemKey="stealFontWesomeIcons"
          @savedOptions="reciveShowSavedOptions"
        ></default-card>
      </div>
    </div>
  </div>
</template>

<script>
import help from "@/data/helpOptions";
import DefaultCard from "@options/pages/options/cards/DefaultCard";

export default {
  name: "TabOthers",
  components: {
    DefaultCard,
  },
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      help,
    };
  },
  methods: {
    reciveShowSavedOptions(value) {
      this.$emit("savedOptionsParent", true);
    },
  },
};
</script>