<template>
  <div class="page-content">
    <main-title title="Funciones ocultas"></main-title>

    <main-content containerClass="hidden-features-container">
      
    </main-content>
  </div>
</template>

<script>
import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";

export default {
  name: "AppPageHiddenFeatures",
  components: {
    MainTitle,
    MainContent,
  },
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      items: [
        {
          name: 'auto increment de versions al publicar'
        },
        {
          name: 'Referencies de tickets i jires al git d\'opensaas'
        },
        {
          name: 'Fix en els labels dels customtags que sempre donen mals entesos'
        }
      ]
    };
  },
};
</script>
