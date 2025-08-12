import ContentScriptToggleSingleton from '@background/contentScriptToggleManager';

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) {
    console.log('tab.id is undefined');
    return;
  }

  if (tab.url && tab.url.startsWith('chrome://')) {
    // 이 조건일 때는 popup html 수정
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js'],
    });
  } catch (error) {
    console.error('❌ Failed to execute script:', error);
  }
});

ContentScriptToggleSingleton.addListener();
