<template>
  <div class="page-content">
    <main-title title="Funcions ocultes"></main-title>

    <main-content containerClass="hidden-features-container">
      <div class="inner-text">
        Funcions ocultes que l'extensió proporciona sense opció a ser
        desactivades.
      </div>

      <div class="row">
        <div
          class="col-12 col-md-6 col-xl-4 mb-5"
          v-for="item in items"
          v-bind:key="item.id"
        >
          <feature-card
            :icon="item.icon"
            :title="item.title"
            :text="item.text"
          ></feature-card>
        </div>
      </div>
    </main-content>
  </div>
</template>

<script>
import MainTitle from "@options/components/main/MainTitle";
import MainContent from "@options/components/main/MainContent";
import FeatureCard from "@options/components/FeatureCard";

export default {
  name: "AppPageHiddenFeatures",
  components: {
    MainTitle,
    MainContent,
    FeatureCard,
  },
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      items: [
        {
          icon:
            '<svg viewBox="0 0 384 512"><path d="M304 192c-41.7 0-76 32-79.7 72.8-25.2-1.3-61.6-7.9-88.8-31.7-20.3-17.8-32.8-43-37.5-75.1 35.5-8.2 62-40 62-77.9 0-44.2-35.8-80-80-80S0 35.8 0 80c0 38.7 27.5 71 64 78.4v195.2C27.5 361 0 393.3 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-38.7-27.5-71-64-78.4V237.4c5.5 7.2 11.7 13.9 18.6 19.9C151 289 197.9 296.1 228 297c10.5 31.9 40.5 55 76 55 44.2 0 80-35.8 80-80s-35.8-80-80-80zM32 80c0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48-48-21.5-48-48zm96 352c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm176-112c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"></path></svg>',
          title: "Auto increment de versió al publicar",
          text:
            "Cada vegada que es fa una publicació desde Opensaas s'agafa l'ultima versió i s'incrementa de forma automàtica.",
        },
        {
          icon:
            '<svg viewBox="0 0 512 512"><path d="M301.148 394.702l-79.2 79.19c-50.778 50.799-133.037 50.824-183.84 0-50.799-50.778-50.824-133.037 0-183.84l79.19-79.2a132.833 132.833 0 0 1 3.532-3.403c7.55-7.005 19.795-2.004 20.208 8.286.193 4.807.598 9.607 1.216 14.384.481 3.717-.746 7.447-3.397 10.096-16.48 16.469-75.142 75.128-75.3 75.286-36.738 36.759-36.731 96.188 0 132.94 36.759 36.738 96.188 36.731 132.94 0l79.2-79.2.36-.36c36.301-36.672 36.14-96.07-.37-132.58-8.214-8.214-17.577-14.58-27.585-19.109-4.566-2.066-7.426-6.667-7.134-11.67a62.197 62.197 0 0 1 2.826-15.259c2.103-6.601 9.531-9.961 15.919-7.28 15.073 6.324 29.187 15.62 41.435 27.868 50.688 50.689 50.679 133.17 0 183.851zm-90.296-93.554c12.248 12.248 26.362 21.544 41.435 27.868 6.388 2.68 13.816-.68 15.919-7.28a62.197 62.197 0 0 0 2.826-15.259c.292-5.003-2.569-9.604-7.134-11.67-10.008-4.528-19.371-10.894-27.585-19.109-36.51-36.51-36.671-95.908-.37-132.58l.36-.36 79.2-79.2c36.752-36.731 96.181-36.738 132.94 0 36.731 36.752 36.738 96.181 0 132.94-.157.157-58.819 58.817-75.3 75.286-2.651 2.65-3.878 6.379-3.397 10.096a163.156 163.156 0 0 1 1.216 14.384c.413 10.291 12.659 15.291 20.208 8.286a131.324 131.324 0 0 0 3.532-3.403l79.19-79.2c50.824-50.803 50.799-133.062 0-183.84-50.802-50.824-133.062-50.799-183.84 0l-79.2 79.19c-50.679 50.682-50.688 133.163 0 183.851z"></path></svg>',
          title: "Enllaços a tickets dins de LC",
          text:
            "Cada referencia d'un ticket de Zendesk o el Jira es converteix en un link. Aplicable als commits, merges i publicacions de LC",
        },
        {
          icon:
            '<svg viewBox="0 0 640 512"><path d="M625.941 293.823L421.823 497.941c-18.746 18.746-49.138 18.745-67.882 0l-1.775-1.775 22.627-22.627 1.775 1.775c6.253 6.253 16.384 6.243 22.627 0l204.118-204.118c6.238-6.239 6.238-16.389 0-22.627L391.431 36.686A15.895 15.895 0 0 0 380.117 32h-19.549l-32-32h51.549a48 48 0 0 1 33.941 14.059L625.94 225.941c18.746 18.745 18.746 49.137.001 67.882zM252.118 32H48c-8.822 0-16 7.178-16 16v204.118c0 4.274 1.664 8.292 4.686 11.314l211.882 211.882c6.253 6.253 16.384 6.243 22.627 0l204.118-204.118c6.238-6.239 6.238-16.389 0-22.627L263.431 36.686A15.895 15.895 0 0 0 252.118 32m0-32a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.746 18.746-49.138 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118V48C0 21.49 21.49 0 48 0h204.118zM144 124c-11.028 0-20 8.972-20 20s8.972 20 20 20 20-8.972 20-20-8.972-20-20-20m0-28c26.51 0 48 21.49 48 48s-21.49 48-48 48-48-21.49-48-48 21.49-48 48-48z"></path></svg>',
          title: "Descripció de creació de custom tag",
          text:
            "Noves descripcións i títols al crear un custom tag de varis idiomes o de valor per idioma unic. Sempre em lío.",
        },
      ],
    };
  },
};
</script>
