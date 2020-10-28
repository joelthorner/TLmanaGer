/**
 * @file Define the BetterTreeLevels class, initialize it and register it in the observerLC
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new BetterTreeLevels
 * @class
 * @classdesc Create a BetterTreeLevels to be extended
 */
class BetterTreeLevels extends LCModifier {

  /**
   * Create a BetterTreeLevels.
   */
  constructor(selector) {
    super(selector);
  }

  /**
   * If node contains .pagesTreeContainer HTMLElement edit all inner HTML
   */
  _match() {
    document.body.classList.add('pagesWindowBetter_betterTreeLevels');

    this.node = this.node.closest('.window');

    if (this.node && this.node.querySelector('.pagesTreeContainer') && !this.node.classList.contains('pagesWindowBetter_betterTreeLevels_window')) {
      this.node.classList.add('pagesWindowBetter_betterTreeLevels_window');
    }
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.logicommerce.pagesWindowBetter.actived && result.logicommerce.pagesWindowBetter.betterTreeLevels) {
    var gridView = new BetterTreeLevels('.windowLayout');
    observerLC.register(gridView);
  }
});
