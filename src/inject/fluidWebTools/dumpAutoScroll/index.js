/**
 * @file If a dump is detected, scroll to it.
 * @author joelthorner
 */
'use strict';

let dump = document.querySelector('.-lucee-dump');

if (!document.getElementById('development-tool') && dump) {
  let elements = document.querySelectorAll('head, body script');

  for (let i = 0; i < elements.length; i++)
    elements[i].remove();

  let goToDump = setInterval(() => {
    let offsetTop = dump.getBoundingClientRect().top + document.body.scrollTop;
    window.scrollTo(0, offsetTop);

    if (window.scrollY == offsetTop)
      clearInterval(goToDump)

  }, 20);

  setTimeout(() => {
    clearInterval(goToDump)
  }, 1500);
}