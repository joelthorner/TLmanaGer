/**
 * @file Define the DeveloperBar class and initialize it.
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new DeveloperBar
 * @class
 */
class DeveloperBar {

  /**
   * Logicommerce info data from constructor
   * @type {Object}
   */
  logiInfo = {};

  /**
   * Create a DeveloperBar.
   * @param {LogiInfo} logiInfo
   */
  constructor(logiInfo) {
    this.logiInfo = logiInfo;
    this._initEnvironment();
  }

  /**
   * Called in _initEnvironment, add bar html structure.
   */
  _appendStructure() {
    document.getElementsByTagName('html')[0].classList.add('lcDeveloperBar');

    document.body.insertAdjacentHTML('beforeend', `
      <nav class="lcDeveloperBar_nav">
        <div class="lcDeveloperBar_icon_cont">
          <div class="lcDeveloperBar_icon"></div>
        </div>
        <div id="lcDeveloperBar_buttons"></div>
        <div id="lcDeveloperBar_search"></div>
        <div class="lcDeveloperBar_extra">
          <button title="Pages" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-pag" onclick="openPages()"></button>
          <button title="Banners" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-ban" onclick="openBanners()"></button>
          <button title="CustomTags" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-tag" onclick="openCustomTagsGroups()"></button>
          <button title="Related sections" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-sec" onclick="openRelatedDefinitions()"></button>
          <button title="FTP" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-ftp" onclick="openFileManager()"></button>
        </div>
      </nav>`);
  }

  /**
   * Initialize bar search system
   */
  _initSearch() {
    document.getElementById('lcDeveloperBar_search')
      .insertAdjacentHTML('beforeend', `<input id="lcDeveloperBar_search-input" type="search" placeholder="Search something...">`);

    document.getElementById('lcDeveloperBar_search-input').addEventListener('keypress', (event) => {
      if (event.key === 'Enter')
        this.executeTagScript(`globalSearch("${event.target.value}");`);
    });

    let searchInputsSelector = '#lcDeveloperBar_search-input, #desktopSearch input, #searchMenu input, [name="criteria"]';
    let searchInputs = document.querySelectorAll(searchInputsSelector);

    document.addEventListener('input', (event) => {
      // loop parent nodes from the target to the delegation node
      for (var target = event.target; target && target != this; target = target.parentNode) {
        if (target instanceof HTMLElement && target.matches(searchInputsSelector)) {
          for (let i = 0; i < searchInputs.length; i++) {
            if (event.target.value != searchInputs[i].value) {
              searchInputs[i].value = event.target.value;
            }
          }
          break;
        }
      }
    }, false);
  }

  /**
   * Initialize bar depends LC environment
   */
  _initEnvironment() {
    if (this.logiInfo.login) {
      document.body.classList.add('lcDeveloperBar_hidden-tlg-window');

      this._appendStructure();
      this._initSearch();

      if (this.logiInfo.devOpenSaas) {
        this._initDevOpenSaas();
      } else if (this.logiInfo.proOpenSaas) {
        this._initProOpenSaas();
      }
    }
  }

  /**
   * Initialize bar if LC is dev open saas
   */
  _initDevOpenSaas() {
    document.getElementById('SML_osUtils').click();

    let stoCatchWindow = setInterval(() => {
      let el = document.querySelector('properties[data*="opensaasUtils"]');

      if (el) {
        let window = el.closest('.window');

        if (window) {
          clearInterval(stoCatchWindow);

          let container = document.getElementById('lcDeveloperBar_buttons');
          window.removeAttribute('style');
          window.removeAttribute('class');
          window.classList.add('lcDeveloperBar_real_window');
          container.append(window);

          this.executeTagScript(`window.windows.windows = [];`);
          document.querySelector('#taskBar .taskMenuLink').remove();

          this._devOSButtonsWindow();
          this._flushRedisBetter();
        }
      }
    }, 50);
  }

  /**
   * Append script and execute-it into body
   * @param {string} scriptString
   */
  executeTagScript(scriptString) {
    var range = document.createRange();
    range.selectNode(document.getElementsByTagName('body')[0]);

    var documentFragment = range.createContextualFragment(`<script>${scriptString}</script>`);
    document.body.appendChild(documentFragment);
  }

  /**
   * Initialize bar if LC is production open saas
   */
  _initProOpenSaas() {
    document.getElementById('lcDeveloperBar_buttons').innerHTML = `
      <input type="button" class="green" value="Repositories" onclick="openOSRepo()">
      <input type="button" class="green" value="Publish" onclick="openOSPublish()">`;
  }

  /**
   * Change dev open saas buttons text
   */
  _devOSButtonsWindow() {
    document.querySelector('input[ls*="utilCleanCacheCode"]').value = 'FLUSH!';
    document.querySelector('input[ls*="utilUpdateCacheProducts"]').value = 'Product update';
    document.querySelector('input[ls*="utilUpdateCacheCategories"]').value = 'Category update';
    document.querySelector('input[ls*="utilReloadApps"]').value = 'App update';
    document.querySelector('input[ls*="utilReloadEvents"]').value = 'Event update';
    document.querySelector('input[ls*="utilDownloadProjectCode"]').value = 'Download code';
  }

  /**
   * Open saas flush button custom event
   */
  _flushRedisBetter() {
    document.addEventListener('click', (event) => {
      // loop parent nodes from the target to the delegation node
      for (var target = event.target; target && target != this; target = target.parentNode) {
        if (target instanceof HTMLElement && target.matches('.__cleanCacheCode__')) {
          this._flushRedisBetterHandler.call(target, event);
          break;
        }
      }
    }, false);
  }

  /**
   * Open saas flush button custom event handler
   * @param {object} event
   */
  _flushRedisBetterHandler(event) {
    document.body.classList.add('lcDeveloperBar_hidden-tlg');
    this.value = '...';
    this.disabled = true;

    setTimeout(() => {
      document.querySelector('.messageBox .rightButtons input').click();

      setTimeout(() => {
        document.querySelector('.messageBox .rightButtons input').click();
        this.value = 'Done!';

        setTimeout(() => {
          document.body.classList.remove('lcDeveloperBar_hidden-tlg');
          this.value = 'FLUSH!';
          this.disabled = false;
        }, 650);
      }, 1000);
    }, 300);
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.developerBar.actived) {
    const logi = new LogiInfo();
    new DeveloperBar(logi);
  }
});
