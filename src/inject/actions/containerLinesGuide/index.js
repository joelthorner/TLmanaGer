/**
 * @file Define containerLinesGuide
 * @author joelthorner
 */
'use strict';

var containerLinesGuide = {

  /**
   * Cookie Name
   * @type {String}
   */
  cookieName: 'containerLinesGuideCookie',

  /**
   * Initialize containerLinesGuide
   * @param {Boolean} load - Indicate if call is in load or by click directive from popup
   */
  init(load) {
    if (load === true && this._getCookie(this.cookieName) === '1')
      this.create();

    else if (load === false && this._getCookie(this.cookieName) === '1')
      this.destroy();

    else if (load === false && this._getCookie(this.cookieName) !== '1')
      this.create();
  },

  /**
   * Create containerLinesGuide, add elements and cookie
   */
  create() {
    this._setCookie(this.cookieName, '1', { path: '/' });

    document.body.insertAdjacentHTML('afterbegin', `
      <div id="containerLinesGuide_wrap">
        <div id="containerLinesGuide_left" class="container"></div>
        <div id="containerLinesGuide_middle" class="container"></div>
        <div id="containerLinesGuide_right" class="container"></div>
        <div id="containerLinesGuide_data" class="container">
          <span>Inner width: <span id="containerLinesGuide_width_inner"></span></span>
          <span>Outer Width: <span id="containerLinesGuide_width_outer"></span></span>
          <span class="containerLinesGuide_paddings">
            Lateral paddings: 
            <span id="containerLinesGuide_paddings_val"></span>
          </span>
        </div>
      </div>
    `);

    document.body.insertAdjacentHTML('afterbegin', `
      <style id="containerLinesGuide_css">${this._getStyle()}</style>
    `);

    this._setSizeValues();
    // window.onresize = this._windowResizeListener;
    window.addEventListener('resize', this._windowResizeListener);
  },

  /**
   * Set container and padding data values on window resize
   */
  _setSizeValues() {
    let containerLinesGuide_width_inner = document.getElementById('containerLinesGuide_width_inner');
    let containerLinesGuide_width_outer = document.getElementById('containerLinesGuide_width_outer');
    let containerLinesGuide_paddings_val = document.getElementById('containerLinesGuide_paddings_val');

    if (containerLinesGuide_width_inner) containerLinesGuide_width_inner.innerHTML = this._getContainerWidth() + 'px';
    if (containerLinesGuide_width_outer) containerLinesGuide_width_outer.innerHTML = this._getContainerOuterWidth() + 'px';
    if (containerLinesGuide_paddings_val) containerLinesGuide_paddings_val.innerHTML = this._getContainerPadding() + 'px';
  },

  /**
   * Update container and padding data values on window resize
   */
  _windowResizeListener(event) {
    containerLinesGuide._setSizeValues();
  },

  /**
   * Destroy containerLinesGuide, remove elements and cookie
   */
  destroy() {
    this._deleteCookie(this.cookieName, '/');
    let containerLinesGuide_wrap = document.getElementById('containerLinesGuide_wrap');
    let containerLinesGuide_css = document.getElementById('containerLinesGuide_css');

    if (containerLinesGuide_wrap) containerLinesGuide_wrap.remove();
    if (containerLinesGuide_css) containerLinesGuide_css.remove();

    // window.onresize = null;
    window.removeEventListener('resize', this._windowResizeListener);
  },

  /**
   * Return js calculated css, static css located into ./index.css
   * @returns {String}
   */
  _getStyle() {
    var cp = this._getContainerPadding() + 'px';

    return `
      #containerLinesGuide_right::before {
        left: ${cp};
      }
      #containerLinesGuide_right::after {
        right: ${cp};
      }
      #containerLinesGuide_data > span:nth-child(2) {
        width: calc(100% + ${cp} + ${cp});
        margin-left: -${cp};
        margin-right: -${cp};
      }
    `;
  },

  /**
   * Return width without paddings of #containerLinesGuide_left Element
   * @returns {Number}
   */
  _getContainerWidth() {
    return document.getElementById('containerLinesGuide_left').offsetWidth;
  },

  /**
   * Return width included paddings of #containerLinesGuide_left Element
   * @returns {Number}
   */
  _getContainerOuterWidth() {
    return this._getContainerWidth() + (this._getContainerPadding() * 2);
  },

  /**
   * Return padding left value of #containerLinesGuide_left Element
   * @returns {Number}
   */
  _getContainerPadding() {
    return parseInt(window.getComputedStyle(document.getElementById('containerLinesGuide_left')).paddingLeft);
  },

  /**
   * Returns a cookie value if a name is specified. Otherwise returns the entire cookies as an object
   * @param {String} [name] - The name of the cookie to fetch the value for. Returns the entire map of cookies if not specified
   * @returns {String|Object} - The value of the cookie specified by `name` if specified. Otherwise returns a name value map of the available cookies
   */
  _getCookie(name) {
    const cookies = document.cookie.split(';')
      .reduce((acc, cookieString) => {
        const [key, value] = cookieString.split('=').map(s => s.trim());
        if (key && value) {
          acc[key] = decodeURIComponent(value);
        }
        return acc;
      }, {});
    return name ? cookies[name] || '' : cookies;
  },

  /**
  * Set a cookie
  * @param {String} name - The name of the cookie to be set
  * @param {String|Number} value - The value of the cookie
  * @param {Object} [options] - supports any cookie option like path, expires, maxAge and domain. [MDN Cookie Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
  */
  _setCookie(name, value, options = {}) {
    document.cookie = `${name}=${encodeURIComponent(value)}${Object.keys(options)
      .reduce((acc, key) => {
        return acc + `;${key.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase())}=${options[key]}`;
      }, '')
      }`;
  },

  /**
  * Delete a cookie by name
  * @param {String} name - The name of the cookie to be deleted
  * @param {String} [path] - The value of the path
  * @param {String} [domain] - The domain value
  */
  _deleteCookie(name, path, domain) {
    if (this._getCookie(name).length) {
      document.cookie = name + "=" +
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }
};
