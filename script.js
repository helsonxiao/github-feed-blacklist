// ==UserScript==
// @name         GitHub Feed Blacklist
// @namespace    https://github.com/helsonxiao
// @version      0.1
// @description  GitHub Feed 黑名单插件
// @author       helsonxiao
// @match        https://github.com/
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const targetList = JSON.parse(localStorage.getItem("feed-blacklist") || "[]");

  function removeTarget() {
    const spans = document.querySelectorAll("span.user-following-container");
    for (let i = 0; i < targetList.length; i++) {
      const target = targetList[i];
      for (const span of spans) {
        const form = span.querySelector(
          'form[action="/users/follow?target=' + target + '"]'
        );
        if (form) {
          const parent = span.closest(".col-12.col-xl-6");
          if (parent) {
            parent.remove();
          }
        }
      }
    }
  }

  window.onload = function () {
    removeTarget();
  };
  function throttle(func, delay) {
    let timer = null;
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          func.apply(this, arguments);
          timer = null;
        }, delay);
      }
    };
  }
  window.addEventListener("scroll", throttle(removeTarget, 1000));
})();
