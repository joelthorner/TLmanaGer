/**
 * @file Initialize bigControlInputs
 * @author joelthorner
 */
'use strict';

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.bigControlInputs.actived) {
    document.getElementsByTagName('html')[0].classList.add('lcBigControlInputs');
  }
});