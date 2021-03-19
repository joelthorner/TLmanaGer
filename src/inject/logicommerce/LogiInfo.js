/**
 * @file Define in an object what Logicommerce is, according to the location
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new LoginInfo
 * @class
 * @classdesc Define which Logicommerce we are in
 */
class LogiInfo {

  /**
   * Development lc is (adm.igd.production)
   * @type {boolean}
   */
  devIgdProd = /https?:\/\/adm\.igd\.production/.test(location);

  /**
   * Development lc is (adm.igd.pre.production)
   * @type {boolean}
   */
  devIgdPreProd = /https?:\/\/adm\.igd\.pre\.production/.test(location);

  /**
   * LC is development open saas
   * @type {boolean}
   */
  devOpenSaas = document.getElementById('SML_osUtils') ? true : false;

  /**
   * Production lc is (8x.logicommerce.net)
   * @type {boolean}
   */
  prod8xReal = /https?:\/\/8x\.logicommerce\.net/.test(location);

  /**
   * Production lc is (8x-hk.logicommerce.net)
   * @type {boolean}
   */
  prod8xRealHk = /https?:\/\/8x-hk\.logicommerce\.net/.test(location);

  /**
   * Production lc is (8x.logicommerce.cn)
   * @type {boolean}
   */
  prod8xRealCn = /https?:\/\/8x\.logicommerce\.cn/.test(location);

  /**
   * Lc is production open saas
   * @type {boolean}
   */
  proOpenSaas = document.getElementById('SML_osRepo') ? true : false;

  /**
   * User has login in LC
   * @type {boolean}
   */
  login = document.getElementById('loginForm') ? false : true;
};
