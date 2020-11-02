/**
 * @file Define the AutoIncrVersionPublish class, initialize it and register it in the observerLC
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new AutoIncrVersionPublish
 * @class
 */
class AutoIncrVersionPublish extends LCModifier {

  /**
   * Create a AutoIncrVersionPublish.
   */
  constructor(selector) {
    super(selector);
  }

  /**
   * If node contains #__popupPublishForm__ find and set next publish version 
   */
  _match() {
    if (this.node && this.node.querySelector('#__popupPublishForm__')) {
      let version = this._getNextPublishVersion();
      let input = this.node.querySelector('#__popupName__');
      if (input) input.value = version;
    }
  }

  /**
   * Return next publish version
   * @return {string}
   */
  _getNextPublishVersion() {
    let versions = document.querySelectorAll('.iconGrid .column.name .osPublishCode');
    let newVersion = 'v1.0.0';

    if (versions && versions.length) {
      let data = JSON.parse(versions[0].getAttribute('data'));
      let versionStrPart = this._getVersionStringPart(data);
      let versionNumPart = this._getVersionNumberPart(data);
      let versionNumberSplit = versionNumPart.split('.');

      if (versionNumberSplit.length) {
        newVersion = this._getVersionNextNumberPart(versionStrPart, versionNumberSplit);
      }
    }
    return newVersion;
  }

  /**
   * Return string part of version ('v', 'V', ...)
   * @param {object} data - Dataset of last publication row of publications window
   * @return {string}
   */
  _getVersionStringPart(data) {
    let stringPartMatch = data.id.match(/^\D+/g);

    if (stringPartMatch) {
      return stringPartMatch[0];
    }
    return 'v';
  }

  /**
   * Return number part of version ('2.3.1', ...)
   * @param {object} data - Dataset of last publication row of publications window
   * @return {string}
   */
  _getVersionNumberPart(data) {
    let numberPartMatch = data.id.match(/\.?(\d\.?){3,}$/g)

    if (numberPartMatch) {
      return numberPartMatch[0];
    }
    return '1.0.0';
  }

  /**
   * Return concat of next version value
   * @param {string} versionStrPart - ('v', 'V', ...)
   * @param {array} versionNumbersArr - Array of number part [2, 3, 1] from '2.3.1' for example.
   * @return {string}
   */
  _getVersionNextNumberPart(versionStrPart, versionNumbersArr) {
    let versionLastNum = versionNumbersArr[versionNumbersArr.length - 1];
    let versionNumLastIncr = this._getLastNumberIncr(versionLastNum); // parseInt(versionLastNum) + 1
    let result = versionStrPart;

    for (let i = 0; i < versionNumbersArr.length; i++) {
      // penultim item
      if (i === versionNumbersArr.length - 2) {
        result += this._getPenultimateNumberIncr(versionNumbersArr[i], versionNumLastIncr);
      }
      // last item
      else if (i === versionNumbersArr.length - 1) {
        result += versionNumLastIncr;
      }
      else {
        result += versionNumbersArr[i] + '.';
      }
    }
    return result;
  }

  /**
   * Return incremented last number 
   * @param {string} number
   * @return {string}
   */
  _getLastNumberIncr(number) {
    let result = parseInt(number) + 1;

    if (result > 10) {
      return 0;
    }
    return result;
  }

  /**
   * Return incremented penultimate number 
   * @param {string} number
   * @param {number} lastNumber
   * @return {string}
   */
  _getPenultimateNumberIncr(number, lastNumber) {
    if (lastNumber == 0) {
      return (parseInt(number) + 1) + '.';
    }
    return number + '.';
  }
}

var autoIncrVersionPublish = new AutoIncrVersionPublish('.messageBox');
observerLC.register(autoIncrVersionPublish);