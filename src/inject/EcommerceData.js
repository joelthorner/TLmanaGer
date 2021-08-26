/**
 * @file Define the ecommerceData object and add popup listener
 * @author joelthorner
 */

/**
 * Ecommerce type fluid
 * @constant {String} 
 */
var TYPE_FLUID = 'fluid';

/**
 * Ecommerce type cold fusion (cf)
 * @constant {String} 
 */
var TYPE_COLD_FUSION = 'cold-fusion';

/**
 * Ecommerce type beyond (php, twig)
 * @constant {String} 
 */
var TYPE_BEYOND = 'beyond';

/**
 * Production environment (no testing, no dev)
 * @constant {String} 
 */
var ENV_PRODUCTION = 'production';

/**
 * Development opensaas environment
 * @constant {String} 
 */
var ENV_PRE_OPENSAAS = 'pre-opensaas';

/**
 * Development local environment
 * @constant {String} 
 */
var ENV_IGD_PRODUCTION = 'igd-production';

/**
 * Development testing environment
 * @constant {String} 
 */
var ENV_IGD_PRE_PRODUCTION = 'igd-pre-production';

/**
 * Ecommerce source code template 2018
 * @constant {String} 
 */
var TEMPLATE_MODULAR_2018 = 'modular-2018';

/**
 * @namespace
 */
var ecommerceData = {

  /**
   * Return type
   * @returns {String|null}
   */
  getType() {
    if (document.body && document.body.classList.value.includes('fluidContent'))
      return TYPE_FLUID;

    if (document && document.querySelector('[href*=".cfm"]'))
      return TYPE_COLD_FUSION;

    if (document.body && document.body.classList.value.includes('lcContent'))
      return TYPE_BEYOND;

    return null;
  },

  /**
   * Return environment
   * @returns {String|null}
   */
  getEnvironment() {
    if ((/[0-9]+\.sandbox\.logicommerce\.net/).test(location))
      return ENV_PRE_OPENSAAS;

    if ((/[0-9]+\.igd\.production/).test(location))
      return ENV_IGD_PRODUCTION;

    if ((/[0-9]+\.igd\.pre\.production/).test(location))
      return ENV_IGD_PRE_PRODUCTION;

    if ((/[0-9]+\.logicommerce\.net/).test(location) || document.querySelector('meta[name="robots"][content="index, follow"]') != null)
      return ENV_PRODUCTION;

    return null;
  },

  /**
   * Get if is template modular 2018
   * @returns {Boolean}
   */
  _isTemplateModular2018() {
    let shopData = document.getElementById('shop-data');
    if (shopData && shopData.dataSet && shopData.dataSet.shopData) {
      let json = JSON.parse(shopData.dataSet.shopData);
      if (json.thisPage) return true;
    }
    return false;
  },

  /**
   * Return template
   * @returns {String|null}
   */
  getTemplate() {
    if (document.querySelector('[data-module]') || this._isTemplateModular2018())
      return TEMPLATE_MODULAR_2018;

    return null;
  },

  /**
   * Get html comments texts
   * @returns {Array}
   */
  _getComments(context) {
    var foundComments = [], elementPath = [context];

    while (elementPath.length > 0) {
      var el = elementPath.pop();
      for (var i = 0; i < el.childNodes.length; i++) {
        var node = el.childNodes[i];
        if (node.nodeType === Node.COMMENT_NODE) {
          foundComments.push(node);
        } else {
          elementPath.push(node);
        }
      }
    }

    return foundComments;
  },

  /**
   * Return if web has any cache detected
   * @returns {Boolean}
   */
  getCache() {
    if (this.getType() == TYPE_FLUID) {
      return this.getFluidCache();
    } else if (this.getType() == TYPE_COLD_FUSION) {
      return false; // TODO, i can find cf cache?
    } else if (this.getType() == TYPE_BEYOND) {
      // TODO
    }
  },

  /**
   * Return if web has fluid cache by html comments
   * @returns {Boolean}
   */
  getFluidCache() {
    var hasCache = false;

    this._getComments(document.body).forEach((comment) => {
      var match = comment.textContent.match(/lcdb_[0-9]{1,5}_[a-zA-Z_0-9]*:/);
      if (match) hasCache = true;
    });

    return hasCache;
  },

  /**
   * Extract shop id from text by regexp
   * @param {String} text
   * @param {RegExp} regex
   * @returns {Number|null}
   */
  _extractShopId(text, regex) {
    var match = text.match(new RegExp(regex));

    if (match && match.length > 1) {
      return parseInt(match[1]);
    }

    return null;
  },

  /**
   * Extract shop id from text by regexp
   * @param {String} text
   * @param {RegExp} regex
   * @returns {Number}
   */
  getShopId() {
    var shopId = null;

    if (this.getType() == TYPE_FLUID) {
      document.querySelectorAll('link[type="text/css"][href]').forEach((item) => {
        var auxShopId = this._extractShopId(item.getAttribute('href'), /cloudfront.net\/([0-9]{1,5})/);
        if (auxShopId) shopId = auxShopId;
      });

      if (this.getEnvironment() == ENV_PRE_OPENSAAS && shopId == null) {
        shopId = this._extractShopId(location.href, /([0-9]+)\.sandbox\.logicommerce\.net/);

      } else if (this.getEnvironment() == ENV_IGD_PRODUCTION && shopId == null) {
        shopId = this._extractShopId(location.href, /([0-9]+)\.igd\.production/);

      } else if (this.getEnvironment() == ENV_IGD_PRE_PRODUCTION && shopId == null) {
        shopId = this._extractShopId(location.href, /([0-9]+)\.igd\.pre\.production/);
      }
    } else if (this.getType() == TYPE_BEYOND) {
      document.querySelectorAll('link[type="text/css"][href]').forEach((item) => {
        var auxShopId = this._extractShopId(item.getAttribute('href'), /assets.logicommerce.cloud\/([0-9]{1,5})/);
        if (auxShopId) shopId = auxShopId;
      });
    }

    return shopId;
  },

  /**
   * @typedef ecommerceDataObject
   * @type {Object}
   * @property {String} type
   * @property {String} environment
   * @property {String} fluidData
   * @property {Number} shopId
   * @property {Boolean} cache
   */

  /**
   * Return all data object
   * @returns {ecommerceDataObject}
   */
  getData() {
    return {
      type: this.getType(),
      environment: this.getEnvironment(),
      template: this.getTemplate(),
      shopId: this.getShopId(),
      cache: this.getCache(),
    }
  },
};

var data = ecommerceData.getData();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getEcommerceData")
    sendResponse({ ecommerceData: data });
});
