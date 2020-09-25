/**
 * @file Define the GridView class, initialize it and register it in the observerLC
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new GridView
 * @class
 * @classdesc Create a GridView to be extended
 */
class GridView extends LCModifier {

  /**
   * Create a GridView.
   */
  constructor(selector) {
    super(selector);
  }

  /**
   * If node contains .pagesTreeContainer HTMLElement edit all inner HTML
   */
  _match() {
    document.body.classList.add('pagesWindowBetter_gridView');

    this.node = this.node.closest('.window');

    if (this.node && this.node.querySelector('.pagesTreeContainer') && !this.node.classList.contains('pagesWindowBetter_gridView_window')) {
      this.node.classList.add('pagesWindowBetter_gridView_window');

      let deleteElements = this.node.querySelectorAll('.windowLayout > .block, .contentContainer > .block');
      if (deleteElements) {
        deleteElements.forEach(element => {
          element.remove();
        });
      }

      setTimeout(() => {
        if (!this.node.classList.contains('maximized')) this.node.querySelector('.maximizeButton').click();
      }, 100);
    }
  }
}

chrome.storage.sync.get(defaults.logicommerce.pagesWindowBetter, (result) => {
  if (result.actived && result.gridView) {
    var gridView = new GridView('.windowLayout');
    observerLC.register(gridView);
  }
});
