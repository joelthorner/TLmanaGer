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
class ObserverZendesk extends Observer {

  /**
   * @inheritdoc
   */
  constructor() {
    super((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        const target = mutations[i].target;

        for (let k = 0; k < this.registeredModifiers.length; k++) {
          let ZendeskModifier = this.registeredModifiers[k];
          ZendeskModifier.init(target);
        }
      }
    });
  }
}

// make observer global variable
let observerZendesk = new ObserverZendesk();
observerZendesk.observe(document.documentElement || document.body);
