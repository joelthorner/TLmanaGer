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
   * Development lc is (8x-os.logicommerce.net)
   * @type {boolean}
   */
  devOpenSaas = /https?:\/\/8x-os\.logicommerce\.net/.test(location);

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
};

// Log.info(new LogiInfo());
