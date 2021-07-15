/**
 * @file Define the BackgroundLC class and initialize it
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new BackgroundLC
 * @class
 */
class BackgroundLC {

  /**
   * Url to execute after set background image
   * @type {String}
   */
  downloadLocation = ''

  /**
   * Create a DeveloperBar.
   * @param {object} chromeData
   */
  constructor(chromeData) {
    this.downloadLocation = chromeData.downloadLocation;

    if (this.downloadLocation.length) {
      if (this.downloadLocation.match('client_id') === null) {
        this.downloadLocation += '?client_id=VUE_APP_UNSPLASH_ACCESS_KEY';
      }
      this._executeDL();
      this._addClasses()
      document.getElementsByTagName('body')[0].style.backgroundImage = `url('${chromeData.image}')`;
    }
  }

  /**
   * Add classes to html node
   */
  _addClasses() {
    document.getElementsByTagName('html')[0].classList.add('lcBackground');
    if (this._isBeyondLc()) {
      document.getElementsByTagName('html')[0].classList.add('lcBackgroundBeyond');
    }
  }

  /**
   * Detect if Logicommerce is beyond version
   * @returns {boolean}
   */
  _isBeyondLc() {
    var shopName = document.getElementById('shopName');
    if (shopName) {
      return shopName.getAttribute('onclick').includes('beyond');
    }
    return false;
  }

  /**
   * Execute ajax to downloadLocation
   */
  _executeDL() {
    var request = new XMLHttpRequest();
    request.open('GET', this.downloadLocation, true);

    request.onload = function () {
      log.info(this.response);
    };

    request.onerror = function () {
      log.error(this.response);
    };

    request.send();
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.background.actived && !document.getElementById('loginForm')) {
    new BackgroundLC(result.options.background);
  }
});
