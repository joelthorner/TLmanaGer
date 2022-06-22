/**
 * @file Define NavigationMenu class and initializeit
 * @author joelthorner
 */
'use strict';

/**
 * Creates a new NavigationMenu
 * @class
 * @classdesc Add navigation TLmanaGer button menu
 */
class NavigationMenu {
  logoIcon = `<svg class="logo_icon" xmlns="http://www.w3.org/2000/svg" width="328.7" height="381.878" viewBox="91.648 65.063 328.7 381.878" fill="#333">
                <path d="M417.854 153.285c-5.479-28.378-21.693-52.948-45.637-69.114-17.998-12.18-38.92-18.608-60.565-18.608-36.043 0-69.58 17.805-89.747 47.581L110.753 277.549C94.556 301.508 88.658 330.32 94.15 358.73c5.479 28.379 21.694 52.938 45.642 69.104 17.979 12.195 38.92 18.607 60.563 18.607 36.027 0 69.563-17.81 89.715-47.603l111.15-164.371c16.228-23.991 22.108-52.787 16.634-81.182zm-157.64 225.307c-13.431 19.883-35.865 31.789-59.858 31.77-14.396 0-28.378-4.307-40.35-12.401-15.957-10.78-26.771-27.146-30.438-46.086-3.664-18.935.289-38.138 11.072-54.072l56.171-82.985L316.334 295l-56.12 83.592z" />
              </svg>`;

  settingsIcon = `<svg class="settings_icon" fill="#333" viewBox="0 0 26 26">
                    <path fill="currentColor" d="M13 16.627a3.625 3.625 0 0 1-3.63-3.622A3.633 3.633 0 0 1 13 9.373a3.633 3.633 0 0 1 3.63 3.632A3.625 3.625 0 0 1 13 16.627m8.295-4.902h-.006a2.116 2.116 0 0 1-1.955-1.307l-.031-.075a2.117 2.117 0 0 1 .459-2.306.693.693 0 0 0 0-.998l-.809-.809a.71.71 0 0 0-.997 0 2.106 2.106 0 0 1-2.295.457l-.08-.033a2.109 2.109 0 0 1-1.302-1.948.705.705 0 0 0-.705-.706h-1.148a.705.705 0 0 0-.705.706c0 .855-.514 1.628-1.306 1.95-.021.009-.043.017-.063.027a2.106 2.106 0 0 1-2.308-.453.72.72 0 0 0-1.006 0l-.81.81a.708.708 0 0 0 0 .997l.007.006a2.11 2.11 0 0 1 .454 2.305c-.01.022-.018.045-.028.066a2.103 2.103 0 0 1-1.95 1.311h-.006a.706.706 0 0 0-.705.706v1.138c0 .39.316.706.705.706h.002a2.1 2.1 0 0 1 1.949 1.306l.029.069a2.11 2.11 0 0 1-.452 2.31l-.004.003a.708.708 0 0 0 0 .998l.809.809a.72.72 0 0 0 1.006 0l.005-.005a2.106 2.106 0 0 1 2.307-.452l.059.024a2.104 2.104 0 0 1 1.306 1.95v.007c0 .395.32.706.705.706h1.148c.385 0 .705-.31.705-.706v-.007c0-.855.514-1.627 1.306-1.95l.059-.024a2.106 2.106 0 0 1 2.307.452l.005.005a.71.71 0 0 0 .997 0l.809-.81a.693.693 0 0 0 0-.997l-.004-.003a2.11 2.11 0 0 1-.452-2.31l.029-.069a2.102 2.102 0 0 1 1.948-1.306h.012a.706.706 0 0 0 .705-.706v-1.138a.706.706 0 0 0-.705-.706"></path>
                  </svg>`;

  constructor() {
    this.createButton();
    this.createEvent();
    this.appendButtonMenu();
  }

  createButton() {
    let tooltip = document.createElement('span');
    tooltip.classList.add('tooltip-text');

    let text = document.createTextNode('TLmanaGer settings');
    tooltip.appendChild(text);

    this.button = document.createElement('button');
    this.button.classList.add('toolbar_link', 'toolbar_link_extension_settings');
    this.button.setAttribute('type', 'button');
    this.button.innerHTML = this.logoIcon + this.settingsIcon;
    this.button.appendChild(tooltip);
  }

  createEvent() {
    this.button.addEventListener('click', this.event, false);
  }

  event() {
    window.open(`${chrome.runtime.getURL("options/options.html")}#/options`, '_blank');
  }

  appendButtonMenu() {
    let li = document.createElement('li');
    li.appendChild(this.button);

    let interval = setInterval(() => {
      let ul = document.querySelector('#main_navigation > ul');
      if (ul) {
        clearInterval(interval);
        document.querySelector('#main_navigation > ul')
          .appendChild(li);
      }
    }, 250);

  }
}

new NavigationMenu();
