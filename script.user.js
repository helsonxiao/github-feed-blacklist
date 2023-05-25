// ==UserScript==
// @name         GitHub Feed Blacklist
// @namespace    https://github.com/helsonxiao
// @version      0.2.1
// @description  GitHub Feed 黑名单插件
// @author       helsonxiao
// @match        https://github.com/
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const targetList = JSON.parse(
    localStorage.getItem("feed-blacklist") || '[""]'
  );

  function removeTargets() {
    const followingContainers = document.querySelectorAll(
      "span.user-following-container"
    );
    const feedItems = document.querySelectorAll(".js-feed-item-component");
    for (let i = 0; i < targetList.length; i++) {
      const target = targetList[i];

      // remove recommended users
      for (const followingContainer of followingContainers) {
        const form = followingContainer.querySelector(
          `form[action="/users/follow?target=${target}"]`
        );
        if (form) {
          const parent = followingContainer.closest(".col-12.col-xl-6");
          parent.remove();
          console.info(
            "[GitHub Feed Blacklist] target has been removed:",
            target,
            parent
          );
        }
      }

      // remove recommended activities
      feedItems.forEach((feedItem) => {
        const anchor = feedItem.querySelector(`a[href="/${target}"]`);
        if (anchor) {
          feedItem.remove();
          console.info(
            "[GitHub Feed Blacklist] target has been removed:",
            target,
            feedItem
          );
        }
      });
    }
  }

  function observeFeedFrame(feedFrame) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          removeTargets();
        }
      });
    });
    observer.observe(feedFrame, {
      childList: true,
    });
  }

  window.onload = function () {
    const feedContainer = document
      .querySelector("#panel-2")
      .querySelector('[data-target="feed-container.content"]');
    const initObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const feedFrame = feedContainer.querySelector("#conduit-feed-frame");
          console.info(
            "[GitHub Feed Blacklist] initObserver found feedFrame:",
            feedFrame
          );
          if (feedFrame) {
            initObserver.disconnect();
            removeTargets();
            observeFeedFrame(feedFrame);
          }
        }
      });
    });
    console.info(
      "[GitHub Feed Blacklist] found feedContainer:",
      feedContainer.cloneNode(true)
    );
    initObserver.observe(feedContainer, {
      childList: true,
    });
  };
})();
