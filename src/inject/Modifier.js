/**
 * @file Define the Modifier class
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new Modifier
 * @class
 * @classdesc Create a Modifier to be extended
 */
class Modifier {

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
   * Create a Modifier.
   */
  constructor(selector) {
    this.selector = selector;
  }

  /**
   * Initialize Modifier logic if node is valid
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
    Log.error('Modifier _match not defined!');
  }
}
