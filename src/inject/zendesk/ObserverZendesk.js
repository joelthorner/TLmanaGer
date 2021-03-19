/**
 * @file Define ObserverZendesk class and initialize for all ZendeskModifier object scripts after this file
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new ObserverZendesk
 * @class
 * @classdesc Create a MutationObserver for Zendesk plugins
 */
class ObserverZendesk {

  /**
   * MutationObserver object
   * @type {MutationObserver}
   */
  observer;

  /**
   * Registered ZendeskModifier objects
   * @type {Array.<ZendeskModifier>}
   */
  registeredZendeskModifiers = [];

  /**
   * Create a ObserverZendesk.
   * Initialize observer and execute ZendeskModifier.init from registeredZendeskModifiers
   */
  constructor() {
    this.observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        const target = mutations[i].target;

        for (let k = 0; k < this.registeredZendeskModifiers.length; k++) {
          let ZendeskModifier = this.registeredZendeskModifiers[k];
          ZendeskModifier.init(target);
        }
      }
    });
  }

  /**
   * Push ZendeskModifier to registeredZendeskModifiers
   * @param {ZendeskModifier} ZendeskModifier
   */
  register(ZendeskModifier) {
    this.registeredZendeskModifiers.push(ZendeskModifier);
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
var observerZendesk = new ObserverZendesk();
observerZendesk.observe(document.documentElement || document.body);
