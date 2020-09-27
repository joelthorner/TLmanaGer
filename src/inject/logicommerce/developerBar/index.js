class DeveloperBar {

  logiInfo = {};

  constructor(logiInfo) {
    this.logiInfo = logiInfo;

    this._appendStructure();
    this._appendScripts();
    this._initSearch();
    this._initEnvironment();

    document.body.classList.add('lcDeveloperBar_hidden-tlg-window');
  }

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
          <button title="Pages" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-pag"></button>
          <button title="Banners" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-ban"></button>
          <button title="CustomTags" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-tag"></button>
          <button title="Related sections" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-sec"></button>
          <button title="FTP" type="button" class="lcDeveloperBar_btn" id="lcDeveloperBar_btn-ftp"></button>
        </div>
      </nav>`);
  }

  _appendScripts() {
    document.body.insertAdjacentHTML('beforeend', `<script>
      document.getElementById('lcDeveloperBar_btn-pag').addEventListener('click', () => { openPages() });
      document.getElementById('lcDeveloperBar_btn-ban').addEventListener('click', () => { openBanners() });
      document.getElementById('lcDeveloperBar_btn-tag').addEventListener('click', () => { openCustomTagsGroups() });
      document.getElementById('lcDeveloperBar_btn-sec').addEventListener('click', () => { openRelatedDefinitions() });
      document.getElementById('lcDeveloperBar_btn-ftp').addEventListener('click', () => { openFileManager() });
    </script>`);
  }

  _initSearch() {
    document.getElementById('lcDeveloperBar_search')
      .insertAdjacentHTML('beforeend', `<input id="lcDeveloperBar_search-input" type="search" placeholder="Search something...">`);

    document.getElementById('lcDeveloperBar_search-input').addEventListener('keypress', (event) => {
      if (event.key === 13) {
        // TODO
      }
    });
  }

  _initEnvironment() {
    if (this.logiInfo.devOpenSaas) {
      this._initDevOpenSaas();
    } else if (this.logiInfo.proOpenSaas) {
      this._initProOpenSaas();
    } else {
      // TODO
    }
  }

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

          document.body.insertAdjacentHTML('beforeend', `<script>window.windows.windows = [];</script>`);
          document.querySelector('#taskBar .taskMenuLink').remove();

          this._devOSButtonsWindow();
          this._flushRedisBetter();
          // flushSnbxOsBar();
        }
      }
    }, 50);
  }
  
  _devOSButtonsWindow() {
    document.querySelector('input[ls*="utilCleanCacheCode"]').value = 'Flush redis';
    document.querySelector('input[ls*="utilUpdateCacheProducts"]').value = 'Product update';
    document.querySelector('input[ls*="utilUpdateCacheCategories"]').value = 'Category update';
    document.querySelector('input[ls*="utilReloadApps"]').value = 'App update';
    document.querySelector('input[ls*="utilReloadEvents"]').value = 'Event update';
    document.querySelector('input[ls*="utilDownloadProjectCode"]').value = 'Download code';
  }

  _flushRedisBetter() {
    document.addEventListener('click', (event) => {
      // loop parent nodes from the target to the delegation node
      for (var target = event.target; target && target != this; target = target.parentNode) {
        if (target.matches('.__cleanCacheCode__')) {
          this._flushRedisBetterHandler.call(target, event);
          break;
        }
      }
    }, false);
  }

  _flushRedisBetterHandler(target, event) {
    document.body.classList.add('lcDeveloperBar_hidden-tlg');
    target.value = '...';

    setTimeout(() => {
      document.querySelector('.messageBox .rightButtons input').click();

      setTimeout(() => {
        document.querySelector('.messageBox .rightButtons input').click();
        target.value = 'Done!';

        setTimeout(() => {
          document.body.classList.remove('lcDeveloperBar_hidden-tlg');
          target.value = 'Flush redis';
        }, 650);
      }, 1000);
    }, 300);
  }
}



chrome.storage.sync.get(defaults.logicommerce.developerBar, (result) => {
  if (result.actived) {
    const logi = new LogiInfo();
    new DeveloperBar(logi);
  }
});
