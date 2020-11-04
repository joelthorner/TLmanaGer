/**
 * @file Define the TicketRefLinks class, initialize it and register it in the observerLC
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new TicketRefLinks
 * @class
 */
class TicketRefLinks extends LCModifier {

  /**
   * Create a TicketRefLinks.
   */
  constructor(selector) {
    super(selector);
  }

  /**
   * If find node search .commitRowDesc > span elements and change your html
   */
  _match() {
    if (this.node && this.node.matches('.gitHistoryView')) {
      let elements = this.node.querySelectorAll('.commitRowDesc > span');
      this.changeLines(elements);
    } else if (this.node && this.node.matches('.gitRepoLsRow')) {
      let elements = this.node.querySelectorAll('.message');
      this.changeLines(elements);
    } else if (this.node && this.node.matches('.column.name') && this.node.closest('.__gitRepoCommitsView__')) {
      let elements = this.node.nextElementSibling.querySelectorAll('.content > div');
      this.changeLines(elements);
    } else if (this.node && this.node.matches('.column.name') && this.node.closest('.publishCode')) {
      let elements = this.node.nextElementSibling.querySelectorAll('.content > div');
      this.changeLines(elements);
    }
  }

  getTicketLink(id) {
    let baseUrl = 'ZENDESK_DOMAIN_BASE_URL';
    return `<a target="_blank" href="${baseUrl}agent/tickets/${id}" title="Open ticket in a new tab">#${id}</a>`;
  }

  getLineHtml(html, tickets) {
    if (tickets) {
      for (let j = 0; j < tickets.length; j++) {
        const ticket = tickets[j];
        const ticketId = parseInt(ticket.replace('#', ''));
        html = html.replace(ticket, this.getTicketLink(ticketId));
      }
    }
    return html;
  }

  changeLines(elements) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.dataset.parsedTickets != 'true') {
        let tickets = element.innerHTML.match(/#\d{5,6}/g);
        element.innerHTML = this.getLineHtml(element.innerHTML, tickets);
        element.dataset.parsedTickets = 'true';
      }
    }
  }

}

var ticketRefLinks = new TicketRefLinks('.gitHistoryView, .gitRepoLsRow, .column.name');
observerLC.register(ticketRefLinks);