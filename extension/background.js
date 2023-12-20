chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.sidePanel.open();
});

//await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });