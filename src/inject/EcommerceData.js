var TYPE_FLUID = 'fluid';
var TYPE_COLD_FUSION = 'cold-fusion';
var TYPE_COLD_BEYOND = 'beyond'; // TODO 

var ENV_PRODUCTION = 'production';
var ENV_PRE_OPENSAAS = 'pre-opensaas';
var ENV_IGD_PRODUCTION = 'igd-production';
var ENV_IGD_PRE_PRODUCTION = 'igd-pre-production';

var TEMPLATE_MODULAR_2018 = 'template-modular-2018';

var ecommerceData = {

  getType() {
    if (document.body.classList.value.includes('fluidContent'))
      return TYPE_FLUID;

    if (document.querySelector('[href*=".cfm"]'))
      return TYPE_COLD_FUSION;

    return null;
  },

  getEnvironment() {
    if ((/[0-9]+\.logicommerce\.net/).test(location) || document.querySelector('meta[name="robots"][content="index, follow"]') != null)
      return ENV_PRODUCTION;

    if ((/[0-9]+\.sandbox\.logicommerce\.net/).test(location))
      return ENV_PRE_OPENSAAS;

    if ((/[0-9]+\.igd\.production/).test(location))
      return ENV_IGD_PRODUCTION;

    if ((/[0-9]+\.igd\.pre\.production/).test(location))
      return ENV_IGD_PRE_PRODUCTION;

    return null;
  },

  getTemplate() {
    if (document.querySelector('[data-module]') && document.body.classList.value.includes('module-'))
      return TEMPLATE_MODULAR_2018;

    return null;
  },

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

  getFluidCache() {
    var hasCache = false;

    this._getComments(document.body).forEach((comment) => {
      var match = comment.textContent.match(/lcdb_[0-9]{1,5}_[a-zA-Z_0-9]*:/);
      if (match) hasCache = true;
    });

    return hasCache;
  },

  getFluidData() {
    return {
      template: this.getTemplate(),
      cache: this.getFluidCache(),
    }
  },

  _extractShopId(text, regex) {
    var match = text.match(new RegExp(regex));

    if (match && match.length > 1) {
      return parseInt(match[1]);
    }

    return null;
  },

  getShopId() {
    var shopId = null;

    document.querySelectorAll('link[type="text/css"][href]').forEach((item) => {
      shopId = this._extractShopId(item.getAttribute('href'), /cloudfront.net\/([0-9]{1,5})/);
    });

    if (this.getType() == TYPE_FLUID && this.getEnvironment() == ENV_PRE_OPENSAAS && shopId == null) {
      shopId = this._extractShopId(location.href, /([0-9]+)\.sandbox\.logicommerce\.net/);

    } else if (this.getEnvironment() == ENV_IGD_PRODUCTION && shopId == null) {
      shopId = this._extractShopId(location.href, /([0-9]+)\.igd\.production/);

    } else if (this.getEnvironment() == ENV_IGD_PRE_PRODUCTION && shopId == null) {
      shopId = this._extractShopId(location.href, /([0-9]+)\.igd\.pre\.production/);
    }

    return shopId;
  },

  getData() {
    return {
      type: this.getType(),
      environment: this.getEnvironment(),
      fluidData: this.getFluidData(),
      shopId: this.getShopId(),
    }
  },
};

var data = ecommerceData.getData();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getEcommerceData")
    sendResponse({ ecommerceData: data });
});
