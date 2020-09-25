var TYPE_FLUID = 'fluid';
var TYPE_COLD_FUSION = 'cold-fusion';
var TYPE_COLD_BEYOND = 'beyond'; // TODO 

var ENV_PRODUCTION = 'production';
var ENV_PRE_OPENSAAS = 'pre-opensaas';
var ENV_IGD_PRODUCTION = 'igd-production';
var ENV_IGD_PRE_PRODUCTION = 'igd-pre-production';

var TEMPLATE_MODULAR_2018 = 'template-modular-2018'

var ecommerceData = {

  getType() {
    if (document.body.classList.value.includes('fluidContent'))
      return TYPE_FLUID;

    if (document.querySelector('[href*=".cfm"]'))
      return TYPE_COLD_FUSION;
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
  },

  getTemplate() {
    if (document.querySelector('[data-module]') && document.body.classList.value.includes('module-'))
      return TEMPLATE_MODULAR_2018;
  },

  getData() {
    return {
      type: this.getType(),
      environment: this.getEnvironment(),
      template: this.getTemplate(),
    }
  },
};

var data = ecommerceData.getData();

chrome.runtime.sendMessage({
  message: "ecommerceData_to_background",
  data,
});
