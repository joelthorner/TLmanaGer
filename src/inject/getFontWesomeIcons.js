'use strict';

/**
 * @namespace
 * @property {string}  name   - Name of icon
 * @property {string}  raw    - Original code html of svg
 * @property {string}  svg    - Clean svg code
 * @property {string}  symbol - Clean symbol code from svg code
 * @property {string}  use    - Use tag code
 * @property {string}  bg     - Css background code
 * @property {string}  color  - Page color of FA.com
 * @property {boolean} added  - Indicate if widget is added
 */
var getFontWesomeIcons = {
  name: '',
  raw: '',
  svg: '',
  symbol: '',
  use: '',
  bg: '',
  color: '',
  added: false,

  /**
   * @param {string} raw - Svg icon html
   * @param {string} color - Hex or rgb/a color string
   */
  init(raw, color) {
    this.raw = raw;
    if (color) this.color = color;
    this.setName();
    this.setUse();
    this.setSvg();
    this.setSymbol();
    this.setBg();
    this.addWidget();

    log.info('getFontWesomeIcons init', getFontWesomeIcons);
  },
  setName() {
    let match = this.raw.match(/data-icon="([a-z0-9\-A-Z]+)"/);
    if (match && match.length > 1) {
      this.name = match[1];
    }
  },
  setUse() {
    this.use = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-${this.name}"></use></svg>`;
  },
  setSvg() {
    let code = this.raw;
    code = code.replace(new RegExp('data-prefix="[a-z]{3}"\\s', "g"), '');
    code = code.replace(new RegExp('data-icon="[a-zA-Z\\-0-9]{1,}"', "g"), '');
    code = code.replace(new RegExp('fill="[a-zA-Z0-9\\#]{1,}"', "g"), '');
    code = code.replace(new RegExp('class="fa-primary"', "g"), 'fill="#000"'); // duotone
    code = code.replace(new RegExp('class="fa-secondary"', "g"), 'fill="#888"'); // duotone
    code = code.replace(new RegExp('class="[a-zA-Z\\-\\s\\-0-9]{0,}"', "g"), '');
    code = code.replace(new RegExp('aria-hidden="[a-zA-Z0-9\\#]{1,}"', "g"), '');
    code = code.replace(new RegExp('focusable="[a-zA-Z0-9\\#]{1,}"', "g"), '');
    code = code.replace(new RegExp('role="[a-zA-Z0-9\\#]{1,}"', "g"), '');
    code = code.replace(new RegExp('<svg', "g"), `<svg id="icon-${this.name}" `); // set id
    code = code.replace(new RegExp('\\s>', "g"), '>'); // clear
    code = code.replace(new RegExp('\\s{2,}', "g"), ' '); // clear
    this.svg = code;
  },
  setSymbol() {
    let code = this.svg;
    code = code.replace(new RegExp('aria-hidden="true"', "g"), '');
    code = code.replace(new RegExp('<svg', "g"), '<symbol');
    code = code.replace(new RegExp('/svg>', "g"), '/symbol>');
    code = code.replace(new RegExp('xmlns="http://www.w3.org/2000/svg"', "g"), '');
    code = code.replace(new RegExp('\\s>', "g"), '>'); // clear
    code = code.replace(new RegExp('\\s{2,}', "g"), ' '); // clear
    this.symbol = code;
  },
  setBg() {
    let code = this.svg;
    code = code.replace(new RegExp('id="[a-zA-Z0-9\\#\\-]{1,}"', "g"), 'fill="#000"');
    code = code.replace(new RegExp('\\s>', "g"), '>'); // clear
    code = code.replace(new RegExp('\\s{2,}', "g"), ' '); // clear
    code = this.replaceAll(code, "%", "%25");
    code = this.replaceAll(code, "> <", "><"); // normalise spaces elements
    code = this.replaceAll(code, "; }", ";}"); // normalise spaces css
    code = this.replaceAll(code, "<", "%3c");
    code = this.replaceAll(code, ">", "%3e");
    code = this.replaceAll(code, "\"", "'");
    code = this.replaceAll(code, "#", "%23"); // needed for ie and firefox
    code = this.replaceAll(code, "{", "%7b");
    code = this.replaceAll(code, "}", "%7d");
    code = this.replaceAll(code, "|", "%7c");
    code = this.replaceAll(code, "^", "%5e");
    code = this.replaceAll(code, "`", "%60");
    code = this.replaceAll(code, "@", "%40");
    this.bg = `background-image: url("data:image/svg+xml;charset=UTF-8,${code}");`;
  },
  /**
   * @param {string} str - String to aply replace
   * @param {string} find - Regex string
   * @param {string} replace - Replace string
   */
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  },
  /**
   * @param {string} str - Regex string to escape
   */
  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  },
  getCss() {
    let key = 'getFontWesomeIcons';
    return `
      #${key}_main {
        position: fixed;
        z-index: 999999;
        left: 0;
        right: 0;
        bottom: 0;
        min-height: 150px;
        background-color: #f8f9fa;
        border-top: 4px solid #f1f3f5;
        padding: 18px 20px 20px;
      }
      #${key}_main .${key}_row {
        margin-left: -15px;
        margin-right: -15px;
        overflow: hidden;
      }
      #${key}_main .${key}_row .${key}_col {
        float: left;
        min-height: 1px;
        padding-left: 15px;
        padding-right: 15px;
        width: 25%;
      }
      #${key}_main .${key}_row .${key}_col label {
        margin-bottom: 10px;
        font-size: 18px;
        display: inline-block;
        line-height: 1;
        vertical-align: middle;
      }
      #${key}_main .${key}_row .${key}_col textarea {
        font-family: monospace;
        box-shadow: none;
        border-width: 2px;
        resize: none;
        height: 100px;
        font-size: 12px;
      }
      #${key}_main .${key}_row .${key}_col textarea:focus {
        border-color: ${this.color};
      }
      #${key}_main #${key}_close {
        padding: 20px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        fill: ${this.color};
      }
      #${key}_main #${key}_close svg {
        height: 16px;
        width: 16px;
      }
      #${key}_download {
        width: 16px;
        display: inline-block;
        vertical-align: text-bottom;
        margin-left: 6px;
        fill:${this.color};
        cursor: pointer;
      }
      #${key}_title {
        margin-top: 10px;
        clear: both;
        font-size: 12px;
        text-align: right;
        margin-bottom: -10px;
      }
      #${key}_title > a {
        color: ${this.color};
      }
    `.replace(/\s\n\t/g, '');
  },
  /**
   * @param {string} key - textarea key output
   * @param {string} text - textarea label text
   */
  getOutputElement(key, text) {
    var download = key == 'svg' ? `
      <div id="getFontWesomeIcons_download" title="Download svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
      </div>
    `: '';

    return `
      <div class="getFontWesomeIcons_col">
        <label for="getFontWesomeIcons_${key}">${text}</label>${download}
        <textarea name="getFontWesomeIcons_${key}" id="getFontWesomeIcons_${key}" onfocus="this.select();" onmouseup="return false;" cols="30" rows="8" class="input-reset input-focus all-animate w-100 bg-white db shadow-inset-2 ba br2 pa3 lh-solid gray8 f4 sans-serif b--gray3"></textarea>
      </div>`;
  },
  getStructure() {
    return `
      <div id="getFontWesomeIcons_close" title="Close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
      </div>
      <div class="getFontWesomeIcons_row">
        ${this.getOutputElement('svg', 'Svg')}
        ${this.getOutputElement('sym', 'Symbol')}
        ${this.getOutputElement('use', 'Use')}
        ${this.getOutputElement('bg', 'Background css')}
      </div>
      <div id="getFontWesomeIcons_title"> Get Font Awesome Powered by <a href="${chrome.extension.getURL("options/options.html")}#/options/others" target="_blank">TLmanaGer</a></div>`;
  },
  addWidget() {
    this.destroy();

    let widget = `
      <div id="getFontWesomeIcons_layout">
        <style>${this.getCss()}</style>
        <div id="getFontWesomeIcons_main">${this.getStructure()}</div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widget);

    document.getElementById('getFontWesomeIcons_svg').value = this.svg;
    document.getElementById('getFontWesomeIcons_sym').value = this.symbol;
    document.getElementById('getFontWesomeIcons_use').value = this.use;
    document.getElementById('getFontWesomeIcons_bg').value = this.bg;

    document.getElementById('getFontWesomeIcons_close').addEventListener('click', (event) => {
      document.getElementById('getFontWesomeIcons_layout').remove();
      this.added = false;
    });

    document.getElementById('getFontWesomeIcons_download').addEventListener('click', (event) => {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.svg));
      element.setAttribute('download', this.name + '.svg');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    });

    this.added = true;
  },
  destroy() {
    let widget = document.getElementById('getFontWesomeIcons_layout');
    if (widget) {
      widget.remove();
      this.added = false;

      log.info('getFontWesomeIcons destroy', undefined);
    }
  },
};

chrome.storage.sync.get(defaults.others.getFontWesomeIcons, (result) => {
  if (result.actived) {

    // Fix issue #214
    var mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (/\/icons\/[a-z0-9\-A-Z]+/.test(location.pathname)) {
            if (node instanceof HTMLElement && node.querySelector('[data-balloon*="size"]')) {
              // Init here script <---
              getFontWesomeIcons.init(
                node.querySelector('[data-balloon*="size"]').innerHTML,
                window.getComputedStyle(node.querySelector('.button-depth'))['backgroundColor']
              );
            }
          } else if (getFontWesomeIcons.added) {
            getFontWesomeIcons.destroy();
          }
        });
      });
    });

    mutationObserver.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });

    // Fix issue #203
    document.addEventListener('click', event => {
      var closest = event.target.closest('a');
      if (event.target.matches('nav > a[href="#"]') || (closest && closest.matches('nav > a[href="#"]'))) {
        getFontWesomeIcons.init(
          document.querySelector('[data-balloon*="size"]').innerHTML,
          window.getComputedStyle(event.target.closest('nav'))['backgroundColor']
        );
      }
    });

  }
});