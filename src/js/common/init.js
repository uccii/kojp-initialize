import * as lib from './lib';

export default function () {
  const globalNav = document.querySelector('.global-nav');
  const globalHeader = document.querySelector('.global-header');
  globalNav.addEventListener('click', lib.utility.toggleClickedAttr);
  globalNav.addEventListener('click', lib.utility.addfirstClickedAttr);
  lib.commonWork.toggleGlobalHeaderWithScroll(globalHeader);

  const smoothScrollTrigerElements = document.querySelectorAll('.js-smoothTrigger a[href^="#"]');
  smoothScrollTrigerElements.forEach((_element) => {
    lib.commonWork.smoothScroll(_element, globalHeader);
  });

  lib.commonWork.waitWebFontLoad('loading-delay');

  const initCreditModal = lib.commonWork.creditModal();
  initCreditModal();
}
