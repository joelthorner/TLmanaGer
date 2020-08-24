<template>
  <div class="tab">
    <div class="inner-text">Other options</div>

    <div class="row">
      <div class="col-xs-12 col-lg-6 col-xl-4">
        <default-card
          :chromeSync="chromeSync"
          title="Reply ticket confirm popup"
          :help="help.replyTicketConfirmPopup"
          scope="zendesk"
          itemKey="replyTicketConfirmPopup"
          @savedOptions="reciveShowSavedOptions"
        ></default-card>
      </div>

      <div class="col-xs-12 col-lg-6 col-xl-4">
        <zendesk-ticket-priority-highlight-colors-card
          :chromeSync="chromeSync"
          title="Reply ticket confirm popup"
          :help="help.ticketPriorityHighlightColors"
          scope="zendesk"
          itemKey="ticketPriorityHighlightColors"
          @savedOptions="reciveShowSavedOptions"
        ></zendesk-ticket-priority-highlight-colors-card>
      </div>
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
  data() {
    return {
      help: {
        replyTicketConfirmPopup: {
          title: "Pages grid view",
          content: "lorem ipsum",
        },
        ticketPriorityHighlightColors: {
          title: "Pages grid view",
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