/**
 * @file Define the BetterGroupHeaders class, initialize it and register it in the observerLC
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new BetterGroupHeaders
 * @class
 */
class BetterGroupHeaders extends LCModifier {

  /**
   * Types of header badge icons
   * @type {Object}
   */
  badgeIcons = [
    {
      key: 'desktop',
      regexp: /(desktop|destop|desk)/,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 0H48C21.5 0 0 21.5 0 48v288c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-6 336H54c-3.3 0-6-2.7-6-6V54c0-3.3 2.7-6 6-6h468c3.3 0 6 2.7 6 6v276c0 3.3-2.7 6-6 6zm-42 152c0 13.3-10.7 24-24 24H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h98.7l18.6-55.8c1.6-4.9 6.2-8.2 11.4-8.2h78.7c5.2 0 9.8 3.3 11.4 8.2l18.6 55.8H456c13.3 0 24 10.7 24 24z"></path></svg>',
      titleIcon: 'Desktop',
    },
    {
      key: 'mobile',
      regexp: /(mobile|mbl|movile)/,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M192 416c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zM320 48v416c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h224c26.5 0 48 21.5 48 48zm-48 410V54c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v404c0 3.3 2.7 6 6 6h212c3.3 0 6-2.7 6-6z"></path></svg>',
      titleIcon: 'Mobile',
    },
    {
      key: 'email',
      regexp: /(email|mail)/,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z"></path></svg>',
      titleIcon: 'Email',
    },
  ]

  /**
   * Default type of header badge icon
   * @type {Object}
   */
  undefinedBadgeIcon = {
    key: 'generic',
    regexp: /./,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M608 128H416a32 32 0 0 0-32 32v320a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32zm0 352H416V160h192zM96 32h384v64h32V32a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v256H16a16 16 0 0 0-16 16v16a64.14 64.14 0 0 0 63.91 64H352v-32H63.91A32 32 0 0 1 32 320h320v-32H96z"></path></svg>',
    titleIcon: 'All views',
  }

  /**
   * .nameLabel HTMLElement finded inside node property
   * @type {HTMLElement|null}
   */
  nameLabel = null;

  /**
   * Create a BetterGroupHeaders.
   */
  constructor(selector) {
    super(selector);
  }

  /**
   * If node contains .nameLabel HTMLElement edit all inner HTML
   */
  _match() {
    this.nameLabel = this.node.querySelector(".nameLabel");

    if (this.nameLabel) {
      let textContent = this.nameLabel.textContent;

      this.nameLabel.innerHTML = '';
      this.nameLabel.classList.add('betterGroupHeaders_nameLabel');

      let badgeIcon = this._createBadgeIcon(textContent);
      this.nameLabel.appendChild(badgeIcon);

      let findBadge = textContent.match(/\[.*\]/);
      if (findBadge && findBadge.length) {
        let badgeText = findBadge[0].replace('[', '').replace(']', '');
        let badge = this._createBadge(badgeText);
        this.nameLabel.appendChild(badge);
        // clear text badge
        textContent = textContent.replace(findBadge[0], '');
      }

      let innerTextNode = this._createInnerTextNode(textContent);
      this.nameLabel.appendChild(innerTextNode);
    }
  }

  /**
   * Create span with simple text
   * @param {String} textContent - textContent of nameLabel property
   * @return {HTMLElement}
   */
  _createInnerTextNode(text) {
    let innerTextNode = document.createElement('span');
    innerTextNode.classList.add('betterGroupHeaders_nameLabel_text');
    innerTextNode.setAttribute('title', text);
    innerTextNode.innerHTML = text;

    return innerTextNode;
  }

  /**
   * Create span with badge
   * @param {String} text - Example: [textfinded] -> textfinded
   * @return {HTMLElement}
   */
  _createBadge(text) {
    let badge = document.createElement('span');
    let classText = this._makeSafeForCSS(text.toLowerCase().trim());
    badge.classList.add(`betterGroupHeaders_badge-item`, `betterGroupHeaders_badge-item-${classText}`);
    badge.innerHTML = text;

    return badge;
  }

  /**
   * Create span with badge icon, for each type search and mathc type of icon
   * @param {String} textContent - textContent of nameLabel property
   * @return {HTMLElement}
   */
  _createBadgeIcon(textContent) {
    let badgeIconNode = document.createElement('span');
    badgeIconNode.classList.add('betterGroupHeaders_badge-scope');
    badgeIconNode.innerHTML = this.undefinedBadgeIcon.icon;
    badgeIconNode.setAttribute('title', this.undefinedBadgeIcon.titleIcon);

    this.badgeIcons.forEach(badgeIcon => {
      if (badgeIcon.regexp.test(textContent.toLowerCase())) {
        badgeIconNode.classList.add(`betterGroupHeaders_badge-scope-${badgeIcon.key}`);
        badgeIconNode.innerHTML = badgeIcon.icon;
        badgeIconNode.setAttribute('title', badgeIcon.titleIcon);
      }
    });

    return badgeIconNode;
  }

  /**
   * Util, convert string to valid class attr string
   * @param {String} name
   * @return {String}
   */
  _makeSafeForCSS(name) {
    return name.replace(/[^a-z0-9]/g, function (s) {
      var c = s.charCodeAt(0);
      if (c == 32)
        return '-';
      if (c >= 65 && c <= 90)
        return '_' + s.toLowerCase();
      return '__' + ('000' + c.toString(16)).slice(-4);
    });
  }
}

chrome.storage.sync.get(defaults, (result) => {
  if (result.options.pagesWindowBetter.actived && result.options.pagesWindowBetter.betterGroupHeaders) {
    var betterGroupHeaders = new BetterGroupHeaders('.pagesGroupContainer');
    observerLC.register(betterGroupHeaders);
  }
});
