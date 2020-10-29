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
    var versions = document.querySelectorAll('.iconGrid .column.name .osPublishCode');
    var newVersion = 'v1.0.0';

    if (versions && versions.length) {
      var data = JSON.parse(versions[0].getAttribute('data'));
      var id_string = data.id.match(/^\D+/g);
      var id_number = data.id.match(/\.?(\d\.?){3,}$/g);

      id_string = id_string ? id_string[0] : 'v';
      id_number = id_number ? id_number[0] : '1.0.0';

      var id_number_arr = id_number.split('.');
      if (id_number_arr.length) {
        var lastNum = parseInt(id_number_arr[id_number_arr.length - 1]) + 1;
        newVersion = id_string;
        for (let index = 0; index < id_number_arr.length - 1; index++) {
          newVersion += id_number_arr[index] + '.';
        }
        newVersion += lastNum;
      }
    }
    return newVersion;
  }
}

var autoIncrVersionPublish = new AutoIncrVersionPublish('.messageBox');
observerLC.register(autoIncrVersionPublish);