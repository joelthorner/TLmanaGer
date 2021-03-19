/**
 * @file Define the TicketPriorityHighlightColors class, initialize it and register it in the observerZendesk
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new TicketPriorityHighlightColors
 * @class
 */
class TicketPriorityHighlightColors extends ZendeskModifier {

  /**
   * <tr> rows to update
   * @type {HTMLElement|null}
   */
  tableRows = null

  /**
   * Indicates whether only "incident" or all tickets should be highlighted.
   * @type {boolean}
   */
  onlyIncidents = true

  /**
   * Priority keys
   * @type {string[]}
   */
  priorities = [
    'low',
    'normal',
    'high',
    'urgent',
  ]

  /**
   * Inciden locale words
   * @type {string[]}
   */
  incidentTextLocales = [
    'incident',  // en/ca
    'incidente', // es
    'vorfall',   // de
  ]

  /**
   * Timeout to avoid too many calls
   * @type {*|null}
   */
  timeout = null

  /**
   * Create a TicketPriorityHighlightColors.
   * @param {string} selector
   * @param {boolean} onlyIncidents
   * @param {object} colors
   */
  constructor(selector, onlyIncidents, colors) {
    super(selector);

    this.onlyIncidents = onlyIncidents;
    this.colors = colors;
    this.addCssVariables();
  }

  /**
   * On finded changed nodes, up to tbody and update all tbody <tr> rows
   */
  _match() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.tableRows = this.node.querySelectorAll('tr.LRcn');

      if (this.tableRows) {
        this.updateRows();
      }
    }, 100);
  }

  /**
   * Update rows highlight
   */
  updateRows() {
    for (let i = 0; i < this.tableRows.length; i++) {
      const row = this.tableRows[i];
      const cells = row.querySelectorAll('td');

      let data = this.getRowData(cells),
        hasPriority = data.priority ? true : false,
        priorityText = data.priority;

      this.clearRow(row);

      if (hasPriority && ((this.onlyIncidents && data.incident) || !this.onlyIncidents)) {
        this.decorateRow(row, priorityText);
      }
    }
  }

  /**
   * Returns priority text and if is incident row
   * @param {HTMLCollection} cells 
   * @returns {object}
   */
  getRowData(cells) {
    let result = {
      priority: null,
      incident: false,
    };

    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      const priority = this.getTextPriority(cell.innerText);
      const incident = this.getIncident(cell.innerText);

      if (priority) {
        result.priority = priority;
      }
      if (incident) {
        result.incident = incident;
      }
    }

    return result;
  }

  /**
   * Get text priority of <td> if match with this.priorities
   * @param {string} text 
   * @returns {string|null}
   */
  getTextPriority(text) {
    text = text.trim().toLowerCase();

    if (this.priorities.includes(text)) {
      return text;
    }

    return null;
  }

  /**
   * Returns if this td has priority text
   * @param {string} text 
   * @returns {boolean}
   */
  getIncident(text) {
    text = text.trim().toLowerCase();
    return this.incidentTextLocales.includes(text);
  }

  /**
   * Add <tr> class
   * @param {HTMLElement} row 
   * @param {string} priorityText 
   */
  decorateRow(row, priorityText) {
    row.classList.add(`TLmanaGer-highlight-${priorityText}`);
  }

  /**
   * Remove classes of decorateRow()
   * @param {HTMLElement} row 
   */
  clearRow(row) {
    row.className = row.className.replace(/TLmanaGer-highlight-(low|normal|high|urgent)/g, '');
  }

  /**
   * Add root color css variables
   */
  addCssVariables() {
    let root = document.documentElement;

    for (const key in this.colors) {
      let borderColor = this.colorLuminance(this.colors[key].bg, -0.1);

      root.style.setProperty(`--color-bg-${key}`, this.colors[key].bg);
      root.style.setProperty(`--color-border-${key}`, borderColor);
      root.style.setProperty(`--color-text-${key}`, this.colors[key].text);
    }
  }

  /**
   * Returns color with luminance modification
   * @param {string} hex 
   * @param {number} lum - Accepts positive and negative floats
   * @returns {string}
   */
  colorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = '#', c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }

    return rgb;
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.ticketPriorityHighlightColors.actived) {
    const onlyIncidents = result.options.ticketPriorityHighlightColors.onlyIncidents;
    const colors = result.options.ticketPriorityHighlightColors.colors;

    const ticketRefLinks = new TicketPriorityHighlightColors('.ember-view tbody', onlyIncidents, colors);
    observerZendesk.register(ticketRefLinks);
  }
});