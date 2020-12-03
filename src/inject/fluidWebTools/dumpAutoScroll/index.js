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

  dump.scrollIntoView({ block: "start", behavior: "smooth" });
}