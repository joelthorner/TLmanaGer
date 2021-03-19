/**
 * @file Define Observer class
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new Observer
 * @class
 * @classdesc Create a MutationObserver class
 */
class Observer {

  /**
   * MutationObserver object
   * @type {MutationObserver}
   */
  observer;

  /**
   * Registered Modifier objects
   * @type {Array.<Modifier>}
   */
  registeredModifiers = [];

  /**
   * Create a Observer.
   * Initialize observer and execute Modifier.init from registeredModifiers
   */
  constructor(observerFunction) {
    this.observerFunction = observerFunction;
    this.observer = new MutationObserver(this.observerFunction);
  }

  /**
   * Push Modifier to registeredModifiers
   * @param {Modifier} Modifier
   */
  register(Modifier) {
    this.registeredModifiers.push(Modifier);
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
