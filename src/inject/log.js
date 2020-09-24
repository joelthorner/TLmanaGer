'use strict';

/**
 * @namespace
 */
var log = {
  /**
   * @param {string} message  - Text to show in console log
   * @param {any} debugEl     - Element to debug
   */
  info(message, debugEl) {
    this.console(message, debugEl, 'info', '#17a2b8', '#ffffff');
  },

  /**
   * @param {string} message  - Text to show in console log
   * @param {any} debugEl     - Element to debug
   */
  error(message, debugEl) {
    this.console(message, debugEl, 'error', '#dc3545', '#ffffff');
  },

  /**
   * @param {string} message  - Text to show in console log
   * @param {any} debugEl     - Element to debug
   */
  warn(message, debugEl) {
    this.console(message, debugEl, 'warn', '#ffc107', '#343a40');
  },

  /**
   * @param {string} message  - Text to show in console log
   * @param {any} debugEl     - Element to debug
   */
  success(message, debugEl) {
    this.console(message, debugEl, 'success', '#28a745', '#ffffff');
  },

  /**
   * @param {string} message      - Text to show in console log
   * @param {any} debugEl         - Element to debug
   * @param {string} level        - Level of log
   * @param {string} bgColor      - Background color badge
   * @param {string} textColor    - Text color badge
   */
  console(message, debugEl, level, bgColor, textColor) {
    console.log(
      `%cLLL%cTLmanaGer%c - %c ${level} %c ${message}`,
      `background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3E%3ClinearGradient id='jt-gradient' gradientUnits='userSpaceOnUse' x1='255.9998' x2='255.9997' y2='512.0005'%3E%3Cstop offset='0' stop-color='%2300a8ff'/%3E%3Cstop offset='1' stop-color='%23007aff'/%3E%3C/linearGradient%3E%3Crect fill='url(%23jt-gradient)' width='512' height='512'/%3E%3Cg%3E%3Cpath fill='%23FFF' d='M417.854 153.285c-5.479-28.378-21.693-52.948-45.637-69.114-17.998-12.18-38.92-18.608-60.565-18.608-36.043 0-69.58 17.805-89.747 47.581L110.753 277.549c-16.197 23.959-22.095 52.771-16.601 81.182 5.479 28.379 21.694 52.935 45.638 69.101 17.981 12.195 38.92 18.607 60.564 18.607 36.027 0 69.563-17.806 89.715-47.599L401.22 234.467c16.231-23.991 22.112-52.787 16.634-81.182zm-157.64 225.307c-13.436 19.879-35.818 31.77-59.858 31.77-14.396 0-28.378-4.307-40.35-12.405-15.957-10.781-26.771-27.142-30.437-46.086-3.664-18.931.289-38.134 11.072-54.072l56.171-82.985L316.334 295l-56.12 83.592z'/%3E%3C/g%3E%3C/svg%3E");background-size:16px;line-height:16px;color:transparent;background-repeat:no-repeat;`,
      `font-size:14px;color:black;font-weight:bold;`,
      `font-weight:normal;color:#888`,
      `background-color:${bgColor};color:${textColor};border-radius:1px;`,
      `color:#000;`,
      debugEl
    );
  },
};