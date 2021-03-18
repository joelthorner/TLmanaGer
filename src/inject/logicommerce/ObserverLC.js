/**
 * @file Define ObserverLC class and initialize for all LCModifier object scripts after this file
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new ObserverLC
 * @class
 * @classdesc Create a MutationObserver for Logicommerce plugins
 */
class ObserverLC {

  /**
   * MutationObserver object
   * @type {MutationObserver}
   */
  observer;

  /**
   * Registered LCModifier objects
   * @type {Array.<LCModifier>}
   */
  registeredLCModifiers = [];

  /**
   * Create a ObserverLC.
   * Initialize observer and execute LCModifier.init from registeredLCModifiers
   */
  constructor() {
    this.observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        let addedNodes = mutations[i].addedNodes;

        for (let j = 0; j < addedNodes.length; j++) {
          let node = addedNodes[j];

          for (let k = 0; k < this.registeredLCModifiers.length; k++) {
            let LCModifier = this.registeredLCModifiers[k];
            LCModifier.init(node);
          }
        }
      }
    });
  }

  /**
   * Push LCModifier to registeredLCModifiers
   * @param {LCModifier} LCModifier
   */
  register(LCModifier) {
    this.registeredLCModifiers.push(LCModifier);
  }

  /**
   * Initialize observer
   * @param {HTMLElement} element - parent observer node
   */
  observe(element) {
    this.observer.observe(element, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Disconnect observer
   */
  disconnect() {
    this.observer.disconnect();
  }
}

// make observer global variable
var observerLC = new ObserverLC();
observerLC.observe(document.documentElement || document.body);
