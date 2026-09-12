/**
 * Background service worker.
 *
 * Its only job is to open the side panel when the user clicks the toolbar icon.
 * All page interaction (reading content, highlighting) happens directly between
 * the side panel and the tab's content script via chrome.tabs messaging, so no
 * message relaying is needed here.
 */

// Toggle the side panel open when the toolbar action is clicked.
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((err) => console.error("[ask-this-page] setPanelBehavior failed:", err));

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((err) =>
      console.error("[ask-this-page] setPanelBehavior failed:", err)
    );
});
