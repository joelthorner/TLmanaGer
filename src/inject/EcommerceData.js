const TYPE_FLUID = 'fluid';
const TYPE_COLD_FUSION = 'cold-fusion';
const TYPE_COLD_BEYOND = 'beyond'; // TODO 

const ENV_PRODUCTION = 'production';
const ENV_PRE_OPENSAAS = 'pre-opensaas';
const ENV_IGD_PRODUCTION = 'igd-production';
const ENV_IGD_PRE_PRODUCTION = 'igd-pre-production';

const TEMPLATE_MODULAR_2018 = 'template-modular-2018'

class EcommerceData {

  get getType() {
    if (document.body.classList.value.includes('fluidContent'))
      return TYPE_FLUID;

    if (document.querySelector('[href*=".cfm"]'))
      return TYPE_COLD_FUSION;
  }

  get getEnvironment() {
    if ((/[0-9]+\.logicommerce\.net/).test(location) || document.querySelector('meta[name="robots"][content="index, follow"]') != null)
      return ENV_PRODUCTION;

    if ((/[0-9]+\.sandbox\.logicommerce\.net/).test(location))
      return ENV_PRE_OPENSAAS;

    if ((/[0-9]+\.igd\.production/).test(location))
      return ENV_IGD_PRODUCTION;

    if ((/[0-9]+\.igd\.pre\.production/).test(location))
      return ENV_IGD_PRE_PRODUCTION;
  }

  get getTemplate(){
    if (document.querySelector('[data-module]') && document.body.classList.value.includes('module-')) 
      return TEMPLATE_MODULAR_2018;
  }

  get getData() {
    return {
      type: this.getType,
      environment: this.getEnvironment,
      template: this.getTemplate,
    }
  }
}
