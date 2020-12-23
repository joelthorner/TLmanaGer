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
   * If find node search find text elements and initialize tickets search
   */
  _match() {
    if (this.node.matches('.gitHistoryView')) {
      let elements = this.node.querySelectorAll('.commitRowDesc > span');
      this.changeLines(elements);
    } else if (this.node.matches('.gitRepoLsRow')) {
      let elements = this.node.querySelectorAll('.message');
      this.changeLines(elements);
    } else if (this.node.matches('.column.name') && this.node.closest('.__gitRepoCommitsView__')) {
      let elements = this.node.nextElementSibling.querySelectorAll('.content > div');
      this.changeLines(elements);
    } else if (this.node.matches('.column.name') && this.node.closest('.publishCode')) {
      let elements = this.node.nextElementSibling.querySelectorAll('.content > div');
      this.changeLines(elements);
    }
  }

  /**
   * Return string html of ticket
   * @param {string} ticket
   * @return {string}
   */
  getTicketLink(ticket) {
    const ticketId = parseInt(ticket.replace(/\D+/g, ''));
    const baseUrl = ticket.includes('#') ? 'ZENDESK_DOMAIN_BASE_URL' : 'JIRA_DOMAIN_BASE_URL';
    const url = ticket.includes('#') ? `${baseUrl}agent/tickets/${ticketId}` : `${baseUrl}browse/${ticket}`;
    return `<a target="_blank" href="${url}" title="Open ticket in a new tab">${ticket}</a>`;
  }

  /**
   * If html string contains tickets replace it with ticket link, else return defautl html.
   * @param {string} html
   * @param {array<string>} tickets
   * @return {string}
   */
  getLineHtml(html, tickets) {
    if (tickets) {
      for (let j = 0; j < tickets.length; j++) {
        const ticket = tickets[j];
        html = html.replace(ticket, this.getTicketLink(ticket));
      }
    }
    return html;
  }

  /**
   * For each html element find tickets and add links
   * @param {Array<HTMLElement>} elements
   */
  changeLines(elements) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.dataset.parsedTickets != 'true') {
        let tickets = element.innerHTML.match(/(#\d{5,6}|(PRJ|MKTG|RD)-\d{4,5})/g);
        element.innerHTML = this.getLineHtml(element.innerHTML, tickets);
        element.dataset.parsedTickets = 'true';
      }
    }
  }

}

var ticketRefLinks = new TicketRefLinks('.gitHistoryView, .gitRepoLsRow, .column.name');
observerLC.register(ticketRefLinks);