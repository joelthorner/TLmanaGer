chrome.storage.sync.get(defaults, (result) => {
  if (result.logicommerce.bigControlInputs.actived) {
    document.getElementsByTagName('html')[0].classList.add('lcBigControlInputs');
  }
});