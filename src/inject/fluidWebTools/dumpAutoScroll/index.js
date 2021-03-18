/**
 * @file If a dump is detected, scroll to it.
 * @author joelthorner
 */
'use strict';

let dump = document.querySelector('.-lucee-dump');

if (!document.getElementById('development-tool') && dump) {
  let elements = document.querySelectorAll('head, body script');

  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }

  let interval = setInterval(() => {
    if (dump.offsetTop !== window.scrollY) {
      dump.scrollIntoView({ block: "start", behavior: "auto" });
    } else {
      clearInterval(interval);
    }
  }, 100);
}