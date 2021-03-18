/**
 * @file Define the LCModifier class
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new LCModifier
 * @class
 * @classdesc Create a LCModifier to be extended
 */
class LCModifier {

  /**
   * HTML selector tobe observed
   * @type {String}
   */
  selector = '';

  /**
   * Finded element from ObserverLC to test
   * @type {HTMLElement}
   */
  node = null;

  /**
   * Create a LCModifier.
   */
  constructor(selector) {
    this.selector = selector;
  }

  /**
   * Initialize LCModifier logic if node is valid
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
    Log.error('LCModifier _match not defined!');
  }
}
