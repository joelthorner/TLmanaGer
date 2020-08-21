<template>
  <div class="tab">
    <div class="inner-text">Opcions de personalització de logicommerce, fons, themes, millores...</div>

    <div class="row">
      <div class="col col-xs-12 col-lg-4">
        <default-card
          :chromeSync="chromeSync"
          title="Developer bar"
          :popover="help.developerBar"
          scope="logicommerce"
          itemKey="developerBar"
					@savedOptions="reciveShowSavedOptions"
        ></default-card>

				<default-card
          :chromeSync="chromeSync"
          title="Sandbox login buttons"
          :popover="help.sandboxLoginButtons"
          scope="logicommerce"
          itemKey="sandboxLoginButtons"
					@savedOptions="reciveShowSavedOptions"
        ></default-card>

				<default-card
          :chromeSync="chromeSync"
          title="Pages grid view"
          :popover="help.pagesGridView"
          scope="logicommerce"
          itemKey="pagesGridView"
					@savedOptions="reciveShowSavedOptions"
        ></default-card>

				<beyond-theme-card
          :chromeSync="chromeSync"
          title="Beyond LC theme"
          :popover="help.beyondTheme"
          scope="logicommerce"
          itemKey="beyondTheme"
					@savedOptions="reciveShowSavedOptions"
        ></beyond-theme-card>
      </div>

      <div class="col col-xs-12 col-lg-8">
        <!-- <div class="card card-option card-option-bg">
          <div class="card-header">
            <div class="card-title">
              LC Background
              <b-button
                v-b-popover.hover.rightbottom="'Lorem ipsum'"
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import DefaultCard from "@options/pages/options/cards/DefaultCard";	
import BeyondThemeCard from "@options/pages/options/cards/BeyondThemeCard";	

export default {
  name: "TabLogicommerce",
  components: {
    DefaultCard,
    BeyondThemeCard,
	},
  props: {
    chromeSync: Object,
	},
  data() {
    return {
      help: {
        developerBar: {
          title: "lorem",
          content: "lorem ipsum",
        },
        sandboxLoginButtons: {
          title: "lorem",
          content: "lorem ipsum",
        },
        pagesGridView: {
          title: "lorem",
          content: "lorem ipsum",
        },
        beyondTheme: {
          title: "lorem",
          content: "lorem ipsum",
        },
      },
    };
	},
	methods: {
		reciveShowSavedOptions(value) {
			this.$emit('savedOptionsParent', true);
		}
	},
};
</script>