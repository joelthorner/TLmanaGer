<template>
  <div class="tab">
    <div class="inner-text">Opcions de personalització de logicommerce, fons, themes, millores...</div>

    <div class="row">
      <div class="col col-xs-12 col-lg-4">
        <default-card
          :chromeSync="chromeSync"
          title="Developer bar"
          :help="help.developerBar"
          scope="logicommerce"
          itemKey="developerBar"
          @savedOptions="reciveShowSavedOptions"
        ></default-card>

        <default-card
          :chromeSync="chromeSync"
          title="Sandbox login buttons"
          :help="help.sandboxLoginButtons"
          scope="logicommerce"
          itemKey="sandboxLoginButtons"
          @savedOptions="reciveShowSavedOptions"
        ></default-card>

        <default-card
          :chromeSync="chromeSync"
          title="Pages grid view"
          :help="help.pagesGridView"
          scope="logicommerce"
          itemKey="pagesGridView"
          @savedOptions="reciveShowSavedOptions"
        ></default-card>

        <beyond-theme-card
          :chromeSync="chromeSync"
          title="Beyond LC theme"
          :help="help.beyondTheme"
          scope="logicommerce"
          itemKey="beyondTheme"
          @savedOptions="reciveShowSavedOptions"
        ></beyond-theme-card>
      </div>

      <div class="col col-xs-12 col-lg-8">
        <logicommerce-background-card
          :chromeSync="chromeSync"
          title="LC Background"
          :help="help.lcBackground"
          scope="logicommerce"
          itemKey="background"
          @savedOptions="reciveShowSavedOptions"
        ></logicommerce-background-card>
        <!-- <div class="card card-option card-option-bg">
          <div class="card-header">
            <div class="card-title">
              LC Background
              <b-button
                v-b-help.hover.rightbottom="'Lorem ipsum'"
                title="Popover Title"
                variant="link"
                v-html="iconInfo"
              ></b-button>
            </div>
            <b-form-checkbox
              v-model="chromeSync.logicommerce.background.actived"
              name="switch-logicommerce-background"
              switch
              v-on:change="debouncedOptionChangeActived($event,'logicommerce', 'background')"
            ></b-form-checkbox>
          </div>
          <div class="card-body">body</div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import DefaultCard from "@options/pages/options/cards/DefaultCard";
import BeyondThemeCard from "@options/pages/options/cards/BeyondThemeCard";
import LogicommerceBackgroundCard from "@options/pages/options/cards/LogicommerceBackgroundCard";

export default {
  name: "TabLogicommerce",
  components: {
    DefaultCard,
		BeyondThemeCard,
		LogicommerceBackgroundCard,
  },
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      help: {
        developerBar: {
          title: "Developer bar",
          content: `<p>Afegeix una barra superior als Logicommerce amb el sistema de publicació de codi Opensaas.</p>
					<br>
					<a href="${chrome.extension.getURL(
            "img/help/developerBar-1.jpg"
          )}" target="_blank"><img class="img-thumbnail" src="${chrome.extension.getURL(
            "img/help/developerBar-1.jpg"
          )}"></a>
					<p>En l'entorn de PRE es mostra una barra amb els <b>botons de utils d'opensaas i un buscador juntament amb shortcuts a pagines, banners, etiquetes i seccions</b>.
					En aquest entorn el botó de fluish te una funcionalitat que amaga i cofnirma automaticament les finestres de confimació per optimitzar el temps de desenvolupament.</p>
					<br><br>
					<a href="${chrome.extension.getURL(
            "img/help/developerBar-2.jpg"
          )}" target="_blank"><img class="img-thumbnail" src="${chrome.extension.getURL(
            "img/help/developerBar-2.jpg"
          )}"></a>
					<p>En l'entorn a real es identic nomes que els utils són els de <b>merge i publicar codi</b>.</p>
					`,
        },
        sandboxLoginButtons: {
          title: "Sandbox login buttons",
          content: `<a href="${chrome.extension.getURL(
            "img/help/sandboxButtons.jpg"
          )}" target="_blank"><img class="img-thumbnail" src="${chrome.extension.getURL(
            "img/help/sandboxButtons.jpg"
          )}"></a><p>En el login d'un client d'un Logicommerce amb el sistema de publicació de codi Opensaas, apareix un selector d'entorn, 
						aquetsa opció ho transforma en <buttons> per accedir-hi mes ràpid.</p>`,
        },
        pagesGridView: {
          title: "Pages grid view",
          content: "lorem ipsum",
        },
        beyondTheme: {
          title: "lorem",
          content: "lorem ipsum",
        },
        lcBackground: {
          title: "lorem",
          content: "lorem ipsum",
        },
      },
    };
  },
  methods: {
    reciveShowSavedOptions(value) {
      this.$emit("savedOptionsParent", true);
    },
  },
};
</script>