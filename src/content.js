import { getUserCode } from './utils/utils.js';
console.log('Content.js');

// content-script.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from service worker:', message);

  // Handle the message
  if (message.type === 'getUserCode') {
    setTimeout(() => {
      const userCode = getUserCode();
      sendResponse({ userCode: userCode });
    }, 1000);
  }

  // Indicates you will send a response asynchronously (if needed).
  return true;
});

