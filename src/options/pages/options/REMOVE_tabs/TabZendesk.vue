<template>
  <div class="tab">
    <div class="inner-text">Opcions de customització i millora de Zendesk</div>

    <div class="row">
      <div class="col default-options-col-grid">
        <default-card
          :chromeSync="chromeSync"
          title="Reply ticket confirm popup"
          scope="zendesk"
          itemKey="replyTicketConfirmPopup"
          @savedOptions="reciveShowSavedOptions"
          @savedHelpKey="reciveHelpKey"
        ></default-card>
        <zendesk-ticket-priority-highlight-colors-card
          :chromeSync="chromeSync"
          title="Ticket priority highlight"
          scope="zendesk"
          itemKey="ticketPriorityHighlightColors"
          @savedOptions="reciveShowSavedOptions"
          @savedHelpKey="reciveHelpKey"
        ></zendesk-ticket-priority-highlight-colors-card>
      </div>

      <!-- <div class="col-xs-12 col-lg-6 col-xl-4"></div> -->
    </div>
  </div>
</template>

<script>
import DefaultCard from "@options/pages/options/cards/DefaultCard";
import ZendeskTicketPriorityHighlightColorsCard from "@options/pages/options/cards/ZendeskTicketPriorityHighlightColorsCard";

export default {
  name: "TabZendesk",
  components: {
    DefaultCard,
    ZendeskTicketPriorityHighlightColorsCard,
  },
  props: {
    chromeSync: Object,
  },
  methods: {
    reciveShowSavedOptions(value) {
      this.$emit("savedOptionsParent", true);
    },
    reciveHelpKey(value) {
      this.$emit("savedHelpKeyParent", value);
    },
  },
};
</script>