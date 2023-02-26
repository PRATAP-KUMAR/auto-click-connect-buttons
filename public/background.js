/* eslint-disable no-undef */
chrome.action.disable();

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(() => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: chrome.runtime.getManifest().host_permissions.map((h) => {
        const [, sub, host] = h.match(/:\/\/(\*\.)?([^/]+)/);
        return new chrome.declarativeContent.PageStateMatcher({
          pageUrl: sub ? { hostSuffix: `.${host}` } : { hostEquals: host },
        });
      }),
      actions: [new chrome.declarativeContent.ShowAction()],
    }]);
  });
});
