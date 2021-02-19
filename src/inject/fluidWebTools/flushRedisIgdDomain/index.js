/**
 * @file Define the FlushRedisIgdDomain class and initialize it.
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new FlushRedisIgdDomain
 * @class
 */
class FlushRedisIgdDomain {

  /**
   * Location origin string url
   * @type {String}
   */
  baseUrl = window.location.origin

  /**
   * Create a FlushRedisIgdDomain.
   */
  constructor() {
    if (this.baseUrl.match(/[0-9]{2,6}\.igd\.production/g)) {
      document.getElementsByTagName('html')[0].classList.add('flushRedisIgdDomain');
      this.appendIframe();
      this.editIframe();
    }
  }

  appendIframe() {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="flushRedisIgdDomain_shortcut">
        <iframe src="${this.baseUrl}/flushredis.cfm?forceview=1" frameborder="0" id="flushRedisIgdDomain_iframe"></iframe>
      </div>`);
  }

  editIframe() {
    setTimeout(() => {
      let submit = document.getElementById('flushRedisIgdDomain_iframe')
        .contentWindow.document.querySelector('[type="submit"]');
      
      submit.style.borderRadius = '0';
      submit.style.width = '116px';
      submit.style.height = '34px';

      submit.addEventListener("click", () => {
        window.location = window.location;
      }, false); 

      // $('.flushRedisIgdDomain_shortcut iframe')
      //   .contents()
      //   .find('[type="submit"]')
      //   .css({
      //     'border-radius': 0,
      //     'width': 116,
      //     'height': 34
      //   })
      // .on('click', function () {
      //   window.location = window.location;
      // });
      document.querySelector('.flushRedisIgdDomain_shortcut').classList.add('init');

      // $('.flushRedisIgdDomain_shortcut').addClass('init');
    }, 500);
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.flushRedisIgdDomain.actived) {
    new FlushRedisIgdDomain();
  }
});
