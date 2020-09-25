class GridView extends LCModifier {

  /**
   * Create a BetterGroupHeaders.
   */
  constructor(selector) {
    super(selector);
  }

  _match() {
    document.body.classList.add('pagesWindowBetter_gridView');

    this.node = this.node.closest('.window');

    if (this.node && !this.node.classList.contains('pagesWindowBetter_gridView_window')) {
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
    var gridView = new GridView('.pagesGroupContainer');
    observerLC.register(gridView);
  }
});
