const extensionApi =
    (typeof browser === 'object' &&
        typeof browser.runtime === 'object' &&
        typeof browser.runtime.getManifest === 'function') ? browser
        : (typeof chrome === 'object' &&
            typeof chrome.runtime === 'object' &&
            typeof chrome.runtime.getManifest === 'function') ? chrome

            : null


const currentTabId = chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    return tabs[0].id
})