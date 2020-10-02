/**
 * @file Define ShowSvgIcons class and execute script
 * @author joelthorner
 */
'use strict';


class Icon {

  node = undefined;

  code = '';

  name = '';

  type = 'svg';

  canGetUseCode = false;

  canGetSvgCode = false;

  constructor(node, code, type, canGetUseCode, canGetSvgCode) {
    this.node = node;
    this.code = code;
    this.type = type;
    this.canGetUseCode = canGetUseCode;
    this.canGetSvgCode = canGetSvgCode;
    this._setNameFromCode();
  }

  get getNode() {
    return this.node;
  }

  setNode(node) {
    this.node = node;
  }

  get getCode() {
    return this.code;
  }

  setCode(code) {
    this.code = code;
  }

  get getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  get getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  get getCanGetUseCode() {
    return this.canGetUseCode;
  }

  setCanGetUseCode(canGetUseCode) {
    this.canGetUseCode = canGetUseCode;
  }

  get getCanGetSvgCode() {
    return this.canGetSvgCode;
  }

  setCanGetSvgCode(canGetSvgCode) {
    this.canGetSvgCode = canGetSvgCode;
  }

  _setNameFromCode() {
    let name = '';
    let search = this.getCode.match(/id=["']([A-Za-z0-9\_\-]*)["']/);
    let search2 = this.getCode.match(/name=["']([A-Za-zÀ-ú0-9 \_\-]*)["']/);

    if (search && search[1]) {
      name = search[1];
    } else if (search2 && search2[1]) {
      name = search2[2];
    }
    this.setName(name);
  }
}

/**
 * Creates a new ShowSvgIcons
 * @class
 * @classdesc Create a widget that finds and displays all svg icons on the web
 */
class ShowSvgIcons {

  /**
   * Finded and unique svg, symbol and img svg elements
   * @type {Array.<Icon>}
   */
  icons = [];

  /**
   * Inserted widget wrapper
   * @type {HTMLElement}
   */
  el = document.getElementById('showSvgIcons_layout');

  /**
   * Total unique finded icons
   * @type {Number}
   */
  uniqueIcons = 0;

  /**
   * Total finded icons
   * @type {Number}
   */
  totalIcons = 0;

  /**
   * Total unique img type finded icons
   * @type {Number}
   */
  uniqueImgIcons = 0;

  /**
   * Total unique svg type finded icons
   * @type {Number}
   */
  uniqueSvgIcons = 0;

  /**
   * Total unique symbol type finded icons
   * @type {Number}
   */
  uniqueSymbolIcons = 0;

  /**
   * Total unique css bg type finded icons
   * @type {Number}
   */
  uniqueCssBgIcons = 0;

  /**
   * Create a showSvgIcons.
   * If the widget already exists it destroys it and reinitializes it.
   */
  constructor() {
    this.setIcons(this._findIcons());
    this.setUniqueIcons(this.icons.length);

    let uniqueSvgIcons = this.icons.filter(obj => {
      return obj.type === 'svg'
    }).length;
    this.setUniqueSvgIcons(uniqueSvgIcons);

    let uniqueSymbolIcons = this.icons.filter(obj => {
      return obj.type === 'symbol'
    }).length;
    this.setUniqueSymbolIcons(uniqueSymbolIcons);

    let uniqueImgIcons = this.icons.filter(obj => {
      return obj.type === 'img'
    }).length;
    this.setUniqueImgIcons(uniqueImgIcons);

    let uniqueCssBgIcons = this.icons.filter(obj => {
      return obj.type === 'css-bg'
    }).length;
    this.setUniqueCssBgIcons(uniqueCssBgIcons);

    if (this.getEl) {
      this.destroy();
    } else {
      this._insertWidget();
      this.setEl(document.getElementById('showSvgIcons_layout'));
      this._events();
    }
  }

  /**
   * Get the icons value.
   * @return {Array.<Icon>} The icons value.
   */
  get getIcons() {
    return this.icons;
  }

  /**
   * Set the icons value.
   * @param {Array.<Icon>} icons - The icons value.
   */
  setIcons(icons) {
    if (Array.isArray(icons)) {
      this.icons = icons;
    }
  }

  /**
   * Get the el value.
   * @return {HTMLElement} The el value.
   */
  get getEl() {
    return this.el;
  }

  /**
   * Set the el value.
   * @param {HTMLElement} el - The el value.
   */
  setEl(el) {
    if (el instanceof HTMLElement) {
      this.el = el;
    }
  }

  /**
   * Get the uniqueIcons value.
   * @return {Number} The uniqueIcons value.
   */
  get getUniqueIcons() {
    return this.uniqueIcons;
  }

  /**
   * Set the uniqueIcons value.
   * @param {Number} uniqueIcons - The uniqueIcons value.
   */
  setUniqueIcons(uniqueIcons) {
    if (Number.isInteger(uniqueIcons)) {
      this.uniqueIcons = uniqueIcons;
    }
  }

  /**
   * Get the totalIcons value.
   * @return {Number} The totalIcons value.
   */
  get getTotalIcons() {
    return this.totalIcons;
  }

  /**
   * Set the totalIcons value.
   * @param {Number} totalIcons - The totalIcons value.
   */
  setTotalIcons(totalIcons) {
    if (Number.isInteger(totalIcons)) {
      this.totalIcons = totalIcons;
    }
  }

  /**
   * Get the uniqueImgIcons value.
   * @return {Number} The uniqueImgIcons value.
   */
  get getUniqueImgIcons() {
    return this.uniqueImgIcons;
  }

  /**
   * Set the uniqueImgIcons value.
   * @param {Number} uniqueImgIcons - The uniqueImgIcons value.
   */
  setUniqueImgIcons(uniqueImgIcons) {
    if (Number.isInteger(uniqueImgIcons)) {
      this.uniqueImgIcons = uniqueImgIcons;
    }
  }

  /**
   * Get the uniqueSvgIcons value.
   * @return {Number} The uniqueSvgIcons value.
   */
  get getUniqueSvgIcons() {
    return this.uniqueSvgIcons;
  }

  /**
   * Set the uniqueSvgIcons value.
   * @param {Number} uniqueSvgIcons - The uniqueSvgIcons value.
   */
  setUniqueSvgIcons(uniqueSvgIcons) {
    if (Number.isInteger(uniqueSvgIcons)) {
      this.uniqueSvgIcons = uniqueSvgIcons;
    }
  }

  /**
   * Get the uniqueSymbolIcons value.
   * @return {Number} The uniqueSymbolIcons value.
   */
  get getUniqueSymbolIcons() {
    return this.uniqueSymbolIcons;
  }

  /**
   * Set the uniqueSymbolIcons value.
   * @param {Number} uniqueSymbolIcons - The uniqueSymbolIcons value.
   */
  setUniqueSymbolIcons(uniqueSymbolIcons) {
    if (Number.isInteger(uniqueSymbolIcons)) {
      this.uniqueSymbolIcons = uniqueSymbolIcons;
    }
  }

  /**
   * Get the uniqueCssBgIcons value.
   * @return {Number} The uniqueCssBgIcons value.
   */
  get getUniqueCssBgIcons() {
    return this.uniqueCssBgIcons;
  }

  /**
   * Set the uniqueCssBgIcons value.
   * @param {Number} uniqueCssBgIcons - The uniqueCssBgIcons value.
   */
  setUniqueCssBgIcons(uniqueCssBgIcons) {
    if (Number.isInteger(uniqueCssBgIcons)) {
      this.uniqueCssBgIcons = uniqueCssBgIcons;
    }
  }

  /**
   * Destroy created widget.
   */
  destroy() {
    this.el.remove();
    this.el = null;
  }

  /**
   * Find all svg icons.
   * @return {Array.<Icon>} An array of objects
   */
  _findIcons() {
    const elements = document.querySelectorAll('svg, symbol, img[src$=".svg"]');
    const cssBgElements = this._getBgImgs(document);

    let findedIcons = [], usedSrcs = [];

    elements.forEach((node) => {
      let valid = false, icon;

      switch (node.nodeName.toLowerCase()) {
        case 'svg':
          valid = node.querySelector('use') ? false : true;
          icon = this._parseSvgIcon(node);
          break;

        case 'symbol':
          valid = true;
          icon = this._parseSymbolIcon(node);
          break;

        case 'img':
          valid = usedSrcs.indexOf(node.getAttribute('src')) > -1 ? false : true;
          if (valid) {
            usedSrcs.push(node.getAttribute('src'));
            icon = this._parseImgIcon(node, node.getAttribute('src'));
          }
          break;
      }

      if (valid) findedIcons.push(icon);
    });

    cssBgElements.forEach((element) => {
      if (usedSrcs.indexOf(element.src) === -1) {
        findedIcons.push(
          this._parseImgIcon(element.node, element.src, 'css-bg')
        );
      }
    });

    this.totalIcons = elements.length + cssBgElements.length;
    return this._removeDuplicateds(findedIcons);
  }

  _getBgImgs(doc) {
    const srcChecker = /url\(\s*?['"]?\s*?(\S+?\.svg)\s*?["']?\s*?\)/i
    return Array.from(
      Array.from(doc.querySelectorAll('*'))
        .reduce((collection, node) => {
          let prop = window.getComputedStyle(node, null)
            .getPropertyValue('background-image')
          let match = srcChecker.exec(prop)
          if (match) {
            collection.add({
              node: node,
              src: match[1],
            })
          }
          return collection
        }, new Set())
    )
  }

  /**
   * Get HTML parsed code from svg node.
   * @param {HTMLElement} node - Svg html node.
   * @return {Icon} Icon object
   */
  _parseSvgIcon(node) {
    let code = node.outerHTML;
    const matchId = code.match(/id=["']([A-Za-z0-9\_\-]*)["']/);
    const canGetUseCode = matchId && matchId[1] ? true : false;

    if (node.getAttribute('width') && node.getAttribute('height') && node.getAttribute('viewBox') === null) {
      node.setAttribute('viewBox', `0 0 ${node.getAttribute('width')} ${node.getAttribute('height')}`);
      code = node.outerHTML;
    }

    return new Icon(
      node,
      code,
      node.nodeName.toLowerCase(),
      canGetUseCode,
      true
    );
  }

  /**
   * Get HTML parsed code from symbol node.
   * @param {HTMLElement} node - Symbol html node.
   * @return {Icon} Icon object
   */
  _parseSymbolIcon(node) {
    let symbolAttrs = '';
    let code = node.outerHTML;
    const matchId = code.match(/id=["']([A-Za-z0-9\_\-]*)["']/);
    const canGetUseCode = matchId && matchId[1] ? true : false;

    this._getElAttributes(node).forEach(element => {
      symbolAttrs += `${element.name}="${element.value}" `;
    });

    const resultCode = `
      <svg xmlns="http://www.w3.org/2000/svg" ${symbolAttrs.trim()}>
        ${node.innerHTML}
      </svg>`;

    return new Icon(
      node,
      resultCode,
      node.nodeName.toLowerCase(),
      canGetUseCode,
      true
    );
  }

  /**
   * Get HTML parsed code from img node.
   * @param {HTMLElement} node - Img html node.
   * @param {String} src - Image source
   * @param {String} [type] - Icon type
   * @return {Icon} Icon object
   */
  _parseImgIcon(node, src, type = 'img') {
    let code = '', canGetSvgCode = false;

    let request = new XMLHttpRequest();
    request.open('GET', src, false);
    try {
      request.send(null);
    } catch (error) {
      code = node.outerHTML;
    }

    if (request.status === 200) {
      canGetSvgCode = true;
      code = request.response;
    }

    return new Icon(
      node,
      code,
      type,
      false,
      canGetSvgCode
    );
  }

  /**
   * Remove duplicated icons from array based on code Icon property
   * @param {Array.<Icon>} findedIcons - Array of Icon objects
   * @return {Array.<Icon>} Unique Array of Icon objects
   */
  _removeDuplicateds(findedIcons) {
    return Array.from(new Set(findedIcons.map(a => a.getCode)))
      .map(code => {
        return findedIcons.find(a => a.getCode === code)
      })
  }

  /**
   * Insert #showSvgIcons_layout node before end <body>
   */
  _insertWidget() {
    let widget = `
      <div id="showSvgIcons_layout">
        <div class="showSvgIcons_container">
          <div class="showSvgIcons_body">
            <div class="showSvgIcons_info">
              <div><b>Total icons</b> ${this.getTotalIcons}</div>
              <div><b>Unique icons (code)</b> ${this.getUniqueIcons}</div>
              <div><b>Img tags</b> ${this.getUniqueImgIcons}/${this.getUniqueIcons}</div>
              <div><b>Svg tags</b> ${this.getUniqueSvgIcons}/${this.getUniqueIcons}</div>
              <div><b>Symbol tags</b> ${this.getUniqueSymbolIcons}/${this.getUniqueIcons}</div>
              <div><b>Css bg</b> ${this.getUniqueCssBgIcons}/${this.getUniqueIcons}</div>
            </div>
            <div class="showSvgIcons_inner">${this._insertIcons()}</div>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', widget);
  }

  /**
   * For each icon generate html structure.
   * @return {String} HTML in string format
   */
  _insertIcons() {
    var html = '';

    this.getIcons.forEach(icon => {
      let useBtn = `<button class="showSvgIcons_button-copy showSvgIcons_button-copy-use" data-type="use" type="button">Copy &lt;use&gt;</button>`;
      let useValue = encodeURIComponent('<svg class="icon"><use xlink:href="#' + icon.getName + '"></use></svg>');
      let useInput = `<input type="text" class="showSvgIcons_input-use" value="${useValue}">`;
      let btnDownload = `<button class="showSvgIcons_button-download" data-name="${icon.getName.length ? icon.getName : 'icon'}" type="button">Download</button>`;

      if (icon.getNode.matches('img'))
        btnDownload = `<a class="showSvgIcons_button-link" target="_blank" href="${icon.getNode.getAttribute('src')}">Download</a>`;

      html += `
        <div class="showSvgIcons_icon-wrap">
          <div class="showSvgIcons_svg-icon-badge showSvgIcons_svg-icon-badge-${icon.getType.toUpperCase()}">
            ${icon.getType}
          </div>
          <div class="showSvgIcons_svg-icon-wrap">${icon.getCode}</div>
          <div class="showSvgIcons_hover-layer">
            ${icon.getCanGetUseCode ? useBtn : ''}
            ${icon.getCanGetSvgCode ? '<button class="showSvgIcons_button-copy showSvgIcons_button-copy-svg" data-type="svg" type="button">Copy &lt;svg&gt;</button>' : ''}
            ${btnDownload}
          </div>
          <input type="text" class="showSvgIcons_input-svg" value="${encodeURIComponent(icon.getCode)}">
          ${icon.getCanGetUseCode ? useInput : ''}
          <div class="showSvgIcons_icon-name">${icon.getName}</div>
        </div>`;
    });

    return html;
  }

  /**
   * Get all HTMLElement attributes
   * @param {HTMLElement} node - Element to substract attributes
   * @return {Array.<{name: String, value: String}>} Array of objects
   */
  _getElAttributes(node) {
    for (var i = 0, atts = node.attributes, n = atts.length, arr = []; i < n; i++) {
      arr.push({
        name: atts[i].nodeName,
        value: atts[i].nodeValue
      });
    }
    return arr;
  }

  /**
   * Add event listeners
   */
  _events() {
    // Copy svg/use events and download event
    document.addEventListener('click', (event) => {
      // loop parent nodes from the target to the delegation node
      for (var target = event.target; target && target != document; target = target.parentNode) {
        if (target.matches('.showSvgIcons_button-copy')) {
          this._copyHandler.call(target, event);
          break;
        } else if (target.matches('.showSvgIcons_button-download')) {
          this._downloadHandler.call(target, event);
          break;
        }
      }
    }, false);

    // Close widget event
    document.querySelector('.showSvgIcons_container').addEventListener('click', (event) => {
      if (!event.target.closest('.showSvgIcons_body') && !event.target.matches('.showSvgIcons_body')) {
        this.destroy();
      }
    });
  }

  /**
   * Download event handler
   * @param {Object} target
   * @param {Object} event
   */
  _downloadHandler(target, event) {
    let input = target.target.closest('.showSvgIcons_icon-wrap').querySelector('.showSvgIcons_input-svg');
    let value = decodeURIComponent(input.value);
    let element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(value));
    element.setAttribute('download', `${target.target.dataset.name}.svg`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  /**
   * Copy event handler
   * @param {Object} target
   * @param {Object} event
   */
  _copyHandler(target, event) {
    let input = target.target.closest('.showSvgIcons_icon-wrap').querySelector(`.showSvgIcons_input-${target.target.dataset.type}`);

    if (input) {
      input.value = decodeURIComponent(input.value);
      input.select();
      document.execCommand('copy');
    }
  }
};

let showSvgIcons = new ShowSvgIcons();
log.info(showSvgIcons);
