/**
 * @file Define GETRefreshImg
 * @author joelthorner
 */
'use strict';

var GETRefreshImg = {

  /**
   * Refresh get param string
   * @type {string}
   */
  refreshValue: 'refresh=' + new Date().getUTCMilliseconds(),

  /**
   * Initialize GETRefreshImg
   */
  init() {
    this.initCssBackgrounds();
    this.initImgs();
  },

  /**
   * Initialize refresh css image backgrounds
   */
  initCssBackgrounds() {
    let backgrounds = this._getBgImgs(document);

    if (backgrounds.length) {
      for (let i = 0; i < backgrounds.length; i++) {
        const background = backgrounds[i];
        let symbol = background.img.includes('?') ? '&' : '?';

        if (!background.img.includes('base64') && !background.img.includes('svg+xml')) {
          background.node.style.backgroundImage = `url('${background.img}${symbol}${this.refreshValue}')`;
        }
      }
    }
  },

  /**
   * Initialize refresh image and picture tags
   */
  initImgs() {
    let elements = document.querySelectorAll('img[src], img[srcset], source[srcset]');

    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let attrName = this._getElementAttrName(element),
          symbol = '?';

        if (attrName) {
          if (element.getAttribute(attrName).includes('?')) {
            symbol = '&';
          }

          let imageSrc = `${element.getAttribute(attrName)}${symbol}${this.refreshValue}`;
          element.setAttribute(attrName, imageSrc);
        }
      }
    }
  },

  /**
   * Of img or picture HTML node returns src attribute name to refresh
   * @param {object} element 
   * @returns {string|null}
   */
  _getElementAttrName(element) {
    if (element.hasAttribute('src'))
      return 'src';
    if (element.hasAttribute('srcset'))
      return 'srcset';

    return null;
  },

  /**
   * Find all elements inside container and return array of objects
   * with background image src and node.
   * @param {object} container - HTML node
   * @returns {object[]}
   */
  _getBgImgs(container) {
    const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i

    return Array.from(
      Array.from(container.querySelectorAll('*'))
        .reduce((collection, node) => {
          let styles = document.defaultView.getComputedStyle(node),
            prop = styles['background-image'];

          let match = srcChecker.exec(prop)
          if (match) {
            collection.add({ img: match[1], node: node })
          }
          return collection
        }, new Set())
    )
  }
};

GETRefreshImg.init();
