/**
 * @file Initialize customTagsLangFix
 * @author joelthorner
 */
'use strict';

let refLangItem = document.querySelector('#desktop .shortcut[onclick*="openOrders"]>div');
if (refLangItem) {
  let ordersWord = refLangItem.textContent.trim().toLowerCase();

  if (ordersWord === 'pedidos') {
    document.getElementsByTagName('html')[0].classList.add('customTagsLangFix-es');
  }
  else if (ordersWord === '进入订单管理') {
    document.getElementsByTagName('html')[0].classList.add('customTagsLangFix-chi');
  }
  else {
    document.getElementsByTagName('html')[0].classList.add('customTagsLangFix-en');
  }
}