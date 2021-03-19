/**
 * @file Define ObserverLC class and initialize for all Modifier object scripts after this file
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new ObserverLC
 * @class
 * @classdesc Create a MutationObserver for Logicommerce plugins
 */
class ObserverLC extends Observer {

  /**
   * @inheritdoc
   */
  constructor() {
    super((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        let addedNodes = mutations[i].addedNodes;

        for (let j = 0; j < addedNodes.length; j++) {
          let node = addedNodes[j];

          for (let k = 0; k < this.registeredModifiers.length; k++) {
            let Modifier = this.registeredModifiers[k];
            Modifier.init(node);
          }
        }
      }
    });
  }
}

// make observer global variable
var observerLC = new ObserverLC();
observerLC.observe(document.documentElement || document.body);
