/**
 * @file Define the ZendeskModifier class
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new ZendeskModifier
 * @class
 * @classdesc Create a ZendeskModifier to be extended
 */
class ZendeskModifier {

  /**
   * HTML selector tobe observed
   * @type {String}
   */
  selector = '';

  /**
   * Finded element from ObserverZendesk to test
   * @type {HTMLElement}
   */
  node = null;

  /**
   * Create a ZendeskModifier.
   */
  constructor(selector) {
    this.selector = selector;
  }

  /**
   * Initialize ZendeskModifier logic if node is valid
   * @param {HTMLElement} node - Finded element from ObserverLC to test
   */
  init(node) {
    if (node instanceof HTMLElement && node.matches(this.selector)) {
      this.node = node;
      this._match();
    }
  }

  /**
   * If node is valid element this method execute the plugin
   * This method has to be overwritten !!
   */
  _match() {
    Log.error('ZendeskModifier _match not defined!');
  }
}
